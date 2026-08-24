import { NextResponse } from "next/server";
import { databasePing } from "@/lib/db";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET() {
  const database = await databasePing();
  const webhookConfigured = Boolean(process.env.INTEX_LEADS_WEBHOOK_URL);
  const leadBackendReady = database.reachable || webhookConfigured;
  const status = leadBackendReady ? "healthy" : "degraded";

  return NextResponse.json(
    {
      ok: leadBackendReady,
      status,
      service: "intexchicago-platform",
      version: "0.3.0",
      readiness: {
        web: true,
        leadBackend: leadBackendReady,
        database: {
          configured: database.configured,
          reachable: database.reachable,
        },
        webhookConfigured,
        adminEnabled: process.env.INTEX_ADMIN_ENABLED === "true",
      },
    },
    {
      status: leadBackendReady ? 200 : 503,
      headers: { "cache-control": "no-store" },
    },
  );
}
