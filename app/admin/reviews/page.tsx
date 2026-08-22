import type { Metadata } from "next";
import { cookies } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { ADMIN_COOKIE, adminConfigured, validAdminSession } from "@/lib/admin-auth";
import { isDatabaseConfigured } from "@/lib/db";
import { listAdminReviews } from "@/lib/review-store";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Reviews CMS | Intex Platform Admin",
  robots: { index: false, follow: false },
};

export default async function AdminReviewsPage() {
  if (!adminConfigured()) notFound();
  const cookieStore = await cookies();
  if (!validAdminSession(cookieStore.get(ADMIN_COOKIE)?.value)) redirect("/admin/login/");

  const databaseConfigured = isDatabaseConfigured();
  let reviews = [] as Awaited<ReturnType<typeof listAdminReviews>>;
  let databaseError = false;
  if (databaseConfigured) {
    try {
      reviews = await listAdminReviews();
    } catch {
      databaseError = true;
    }
  }

  return (
    <main className="adminPage">
      <section className="adminHeader">
        <div>
          <span>Intex Platform · CMS</span>
          <h1>Reviews</h1>
          <p>Only verified, permitted reviews can be made public.</p>
        </div>
        <div className="adminHeaderActions">
          <a href="/admin/reviews/new/">+ New review</a>
          <a href="/admin/">Control Center</a>
        </div>
      </section>

      {!databaseConfigured || databaseError ? (
        <section className="adminPanel adminSinglePanel">
          <div><span>Database</span><h2>{databaseError ? "Review storage is unreachable." : "MySQL is not configured yet."}</h2></div>
          <p>Configure the private database and apply `db/schema.sql` before using the review editor.</p>
        </section>
      ) : reviews.length === 0 ? (
        <section className="adminPanel adminSinglePanel">
          <div><span>Review library</span><h2>No reviews have been added yet.</h2></div>
          <p>Do not import review text until source, accuracy, and display permission have been verified.</p>
        </section>
      ) : (
        <section className="adminContentList">
          {reviews.map((review) => {
            const publicReady = review.published && review.verified && review.permissionToDisplay;
            return (
              <a href={`/admin/reviews/${review.id}/`} className="adminContentRow" key={review.id}>
                <div>
                  <span className={publicReady ? "adminStatus status-closed" : "adminStatus"}>{publicReady ? "published" : review.verified ? "verified" : "draft"}</span>
                  <strong>{review.reviewerName}</strong>
                  <small>{review.source}{review.rating ? ` · ${review.rating.toFixed(1)} / 5` : ""}</small>
                </div>
                <span>Edit →</span>
              </a>
            );
          })}
        </section>
      )}
    </main>
  );
}
