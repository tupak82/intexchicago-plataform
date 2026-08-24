import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { ADMIN_COOKIE, validAdminSession } from "@/lib/admin-auth";
import { createReview } from "@/lib/review-store";
import { parseReviewInput } from "@/lib/review-input";
import { isTrustedSameOriginRequest } from "@/lib/request-security";

export const runtime = "nodejs";

function adminRedirect(request: Request, path: string) {
  return NextResponse.redirect(new URL(path, request.url), 303);
}

export async function POST(request: Request) {
  const cookieStore = await cookies();
  if (!validAdminSession(cookieStore.get(ADMIN_COOKIE)?.value)) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }
  if (!isTrustedSameOriginRequest(request)) {
    return NextResponse.json({ ok: false, error: "invalid_origin" }, { status: 403 });
  }

  const parsed = parseReviewInput(await request.formData());
  if (!parsed.ok) return adminRedirect(request, `/admin/reviews/new/?error=${encodeURIComponent(parsed.error)}`);

  try {
    const id = await createReview(parsed.value);
    if (!id) return adminRedirect(request, "/admin/reviews/new/?error=database_not_configured");
    return adminRedirect(request, `/admin/reviews/${id}/?saved=1`);
  } catch {
    return adminRedirect(request, "/admin/reviews/new/?error=save_failed");
  }
}
