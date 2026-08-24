import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { ADMIN_COOKIE, validAdminSession } from "@/lib/admin-auth";
import { updateReview } from "@/lib/review-store";
import { parseReviewInput } from "@/lib/review-input";
import { isTrustedSameOriginRequest } from "@/lib/request-security";

export const runtime = "nodejs";

function adminRedirect(request: Request, path: string) {
  return NextResponse.redirect(new URL(path, request.url), 303);
}

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const cookieStore = await cookies();
  if (!validAdminSession(cookieStore.get(ADMIN_COOKIE)?.value)) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }
  if (!isTrustedSameOriginRequest(request)) {
    return NextResponse.json({ ok: false, error: "invalid_origin" }, { status: 403 });
  }

  const { id } = await params;
  const reviewId = Number(id);
  if (!Number.isInteger(reviewId) || reviewId <= 0) {
    return NextResponse.json({ ok: false, error: "invalid_review_id" }, { status: 400 });
  }

  const parsed = parseReviewInput(await request.formData());
  if (!parsed.ok) return adminRedirect(request, `/admin/reviews/${reviewId}/?error=${encodeURIComponent(parsed.error)}`);

  try {
    const updated = await updateReview(reviewId, parsed.value);
    if (!updated) return adminRedirect(request, `/admin/reviews/${reviewId}/?error=review_not_found`);
    return adminRedirect(request, `/admin/reviews/${reviewId}/?saved=1`);
  } catch {
    return adminRedirect(request, `/admin/reviews/${reviewId}/?error=save_failed`);
  }
}
