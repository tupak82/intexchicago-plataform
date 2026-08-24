import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { ADMIN_COOKIE, validAdminSession } from "@/lib/admin-auth";
import { isLeadStatus, updateAdminLead } from "@/lib/admin-leads";
import { isTrustedSameOriginRequest } from "@/lib/request-security";

export const runtime = "nodejs";

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const cookieStore = await cookies();
  if (!validAdminSession(cookieStore.get(ADMIN_COOKIE)?.value)) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }
  if (!isTrustedSameOriginRequest(request)) {
    return NextResponse.json({ ok: false, error: "invalid_origin" }, { status: 403 });
  }

  const { id } = await params;
  const leadId = Number(id);
  if (!Number.isInteger(leadId) || leadId <= 0) {
    return NextResponse.json({ ok: false, error: "invalid_lead_id" }, { status: 400 });
  }

  const form = await request.formData();
  const status = String(form.get("status") || "");
  const notes = String(form.get("notes") || "");
  if (!isLeadStatus(status)) {
    return NextResponse.json({ ok: false, error: "invalid_status" }, { status: 400 });
  }

  try {
    const updated = await updateAdminLead(leadId, status, notes);
    if (!updated) return NextResponse.json({ ok: false, error: "lead_not_found" }, { status: 404 });
  } catch {
    return NextResponse.json({ ok: false, error: "database_unavailable" }, { status: 503 });
  }

  return NextResponse.redirect(new URL(`/admin/leads/${leadId}/`, request.url), 303);
}
