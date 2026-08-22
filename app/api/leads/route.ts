import { NextResponse } from "next/server";
import { normalizeLead, type LeadPayload, validateLead } from "@/lib/leads";
import { allowLeadRequest } from "@/lib/rate-limit";

export const runtime = "nodejs";

function requestKey(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  const realIp = request.headers.get("x-real-ip")?.trim();
  return forwardedFor || realIp || "unknown";
}

export async function POST(request: Request) {
  if (!allowLeadRequest(requestKey(request))) {
    return NextResponse.json({ ok: false, error: "rate_limited" }, { status: 429 });
  }

  const contentLength = Number(request.headers.get("content-length") || "0");
  if (contentLength > 25_000) {
    return NextResponse.json({ ok: false, error: "payload_too_large" }, { status: 413 });
  }

  let body: Partial<LeadPayload>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  const validation = validateLead(body);
  if (!validation.valid) {
    const spam = validation.errors.includes("spam");
    return NextResponse.json(
      { ok: spam, error: spam ? undefined : "invalid_lead", fields: spam ? undefined : validation.errors },
      { status: spam ? 202 : 400 },
    );
  }

  const webhookUrl = process.env.INTEX_LEADS_WEBHOOK_URL;
  if (!webhookUrl) {
    return NextResponse.json(
      { ok: false, error: "lead_backend_not_configured" },
      { status: 503 },
    );
  }

  const lead = normalizeLead(body as LeadPayload);
  const response = await fetch(webhookUrl, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      ...(process.env.INTEX_LEADS_WEBHOOK_SECRET
        ? { authorization: `Bearer ${process.env.INTEX_LEADS_WEBHOOK_SECRET}` }
        : {}),
    },
    body: JSON.stringify(lead),
    cache: "no-store",
  });

  if (!response.ok) {
    return NextResponse.json({ ok: false, error: "lead_backend_unavailable" }, { status: 502 });
  }

  return NextResponse.json({ ok: true }, { status: 201 });
}
