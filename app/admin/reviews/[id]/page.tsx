import type { Metadata } from "next";
import { cookies } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { ADMIN_COOKIE, adminConfigured, validAdminSession } from "@/lib/admin-auth";
import { getAdminReview } from "@/lib/review-store";
import ReviewForm from "../ReviewForm";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Edit Review | Intex Platform Admin",
  robots: { index: false, follow: false },
};

const messages: Record<string, string> = {
  missing_required_fields: "Reviewer name, source, and review text are required.",
  invalid_rating: "Rating must be between 1 and 5.",
  invalid_source_url: "Use a valid http/https source URL.",
  invalid_review_date: "Use a valid review date.",
  publish_requires_verification_and_permission: "A review cannot be published until source verification and display permission are both confirmed.",
  review_not_found: "This review could not be found in the database.",
  save_failed: "The review could not be saved. Check database availability and try again.",
};

export default async function EditReviewPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ error?: string; saved?: string }>;
}) {
  if (!adminConfigured()) notFound();
  const cookieStore = await cookies();
  if (!validAdminSession(cookieStore.get(ADMIN_COOKIE)?.value)) redirect("/admin/login/");

  const { id } = await params;
  const { error, saved } = await searchParams;
  const reviewId = Number(id);
  if (!Number.isInteger(reviewId) || reviewId <= 0) notFound();

  let review = null;
  try {
    review = await getAdminReview(reviewId);
  } catch {
    review = null;
  }
  if (!review) notFound();

  const publicReady = review.published && review.verified && review.permissionToDisplay;

  return (
    <main className="adminPage">
      <section className="adminHeader">
        <div><span>Review #{review.id}</span><h1>{review.reviewerName}</h1><p>{publicReady ? "Published verified review" : review.verified ? "Verified review" : "Draft review"}</p></div>
        <div className="adminHeaderActions"><a href="/admin/reviews/">← Reviews</a></div>
      </section>
      {saved ? <div className="adminNotice success">Review saved successfully.</div> : null}
      {error ? <div className="adminNotice error" role="alert">{messages[error] || "The review could not be saved."}</div> : null}
      <section className="adminEditorShell"><ReviewForm review={review} /></section>
    </main>
  );
}
