import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export function GET() {
  const leadBackendConfigured = Boolean(process.env.INTEX_LEADS_WEBHOOK_URL);

  return NextResponse.json(
    {
      ok: true,
      service: "intexchicago-platform",
      version: "0.2.0",
      readiness: {
        web: true,
        leadBackend: leadBackendConfigured,
        adminEnabled: process.env.INTEX_ADMIN_ENABLED === "true",
      },
    },
    {
      headers: { "cache-control": "no-store" },
    },
  );
}
