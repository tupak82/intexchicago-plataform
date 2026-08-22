import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { ADMIN_COOKIE, validAdminSession } from "@/lib/admin-auth";
import { createProject } from "@/lib/project-store";
import { parseProjectInput } from "@/lib/project-input";

export const runtime = "nodejs";

function sameOrigin(request: Request) {
  const origin = request.headers.get("origin");
  if (!origin) return true;
  try {
    return new URL(origin).host === new URL(request.url).host;
  } catch {
    return false;
  }
}

function adminRedirect(request: Request, path: string) {
  return NextResponse.redirect(new URL(path, request.url), 303);
}

export async function POST(request: Request) {
  const cookieStore = await cookies();
  if (!validAdminSession(cookieStore.get(ADMIN_COOKIE)?.value)) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }
  if (!sameOrigin(request)) {
    return NextResponse.json({ ok: false, error: "invalid_origin" }, { status: 403 });
  }

  const parsed = parseProjectInput(await request.formData());
  if (!parsed.ok) return adminRedirect(request, `/admin/projects/new/?error=${encodeURIComponent(parsed.error)}`);

  try {
    const id = await createProject(parsed.value);
    if (!id) return adminRedirect(request, "/admin/projects/new/?error=database_not_configured");
    return adminRedirect(request, `/admin/projects/${id}/?saved=1`);
  } catch (error) {
    const code = typeof error === "object" && error && "code" in error ? String(error.code) : "";
    const reason = code === "ER_DUP_ENTRY" ? "duplicate_slug" : "save_failed";
    return adminRedirect(request, `/admin/projects/new/?error=${reason}`);
  }
}
