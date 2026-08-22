import type { Metadata } from "next";
import { listPublicReviews } from "@/lib/review-store";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const reviews = await listPublicReviews();
  return {
    title: "Customer Reviews",
    description: "Verified customer feedback approved for display by Intex Restoration.",
    alternates: { canonical: "/reviews/" },
    robots: reviews.length ? { index: true, follow: true } : { index: false, follow: true },
  };
}

export default async function ReviewsPage() {
  const reviews = await listPublicReviews();

  return (
    <main className="platformPage">
      <section className="platformHero compact">
        <div className="platformBreadcrumbs"><a href="/">Home</a> / Reviews</div>
        <p className="kicker"><span /> Verified feedback</p>
        <h1>Reviews we can stand behind.</h1>
        <p>Only feedback with a verified source and confirmed display permission is eligible to appear here.</p>
      </section>

      <section className="platformSection">
        {reviews.length ? (
          <div className="reviewGrid">
            {reviews.map((review) => (
              <article className="reviewCard" key={review.id}>
                <div className="reviewCardTop">
                  <span>{review.source}</span>
                  {review.rating > 0 ? <strong aria-label={`${review.rating} out of 5 stars`}>{review.rating.toFixed(1)} / 5</strong> : null}
                </div>
                <blockquote>“{review.text}”</blockquote>
                <footer>
                  <b>{review.reviewerName}</b>
                  {review.publishedAt ? <time dateTime={review.publishedAt}>{review.publishedAt}</time> : null}
                  {review.sourceUrl ? <a href={review.sourceUrl} target="_blank" rel="noreferrer nofollow">View source ↗</a> : null}
                </footer>
              </article>
            ))}
          </div>
        ) : (
          <div className="platformEmpty">
            <span>Verification first</span>
            <h2>No reviews are published yet.</h2>
            <p>The platform will not fill this section with copied, fabricated, or unverified testimonials. Reviews appear only after source and display rights are confirmed.</p>
          </div>
        )}
      </section>
    </main>
  );
}
