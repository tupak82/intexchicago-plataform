import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { ADMIN_COOKIE, validAdminSession } from "@/lib/admin-auth";
import { updateProject } from "@/lib/project-store";
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

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const cookieStore = await cookies();
  if (!validAdminSession(cookieStore.get(ADMIN_COOKIE)?.value)) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }
  if (!sameOrigin(request)) {
    return NextResponse.json({ ok: false, error: "invalid_origin" }, { status: 403 });
  }

  const { id } = await params;
  const projectId = Number(id);
  if (!Number.isInteger(projectId) || projectId <= 0) {
    return NextResponse.json({ ok: false, error: "invalid_project_id" }, { status: 400 });
  }

  const parsed = parseProjectInput(await request.formData());
  if (!parsed.ok) return adminRedirect(request, `/admin/projects/${projectId}/?error=${encodeURIComponent(parsed.error)}`);

  try {
    const updated = await updateProject(projectId, parsed.value);
    if (!updated) return adminRedirect(request, `/admin/projects/${projectId}/?error=project_not_found`);
    return adminRedirect(request, `/admin/projects/${projectId}/?saved=1`);
  } catch (error) {
    const code = typeof error === "object" && error && "code" in error ? String(error.code) : "";
    const reason = code === "ER_DUP_ENTRY" ? "duplicate_slug" : "save_failed";
    return adminRedirect(request, `/admin/projects/${projectId}/?error=${reason}`);
  }
}
