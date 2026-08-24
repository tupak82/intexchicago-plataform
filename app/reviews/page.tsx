import type { Metadata } from "next";
import { listPublicReviews } from "@/lib/review-store";
import { site } from "@/lib/site";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const reviews = await listPublicReviews();
  return {
    title: "Customer Reviews",
    description: "Customer feedback approved for display by Intex Chicago Roofing.",
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
        <p className="kicker"><span /> Customer feedback</p>
        <h1>Feedback tied to a real source.</h1>
        <p>When a review appears here, the source is retained so visitors can understand where the feedback came from rather than seeing anonymous marketing quotes.</p>
        <div className="heroActions">
          <a className="primaryButton" href="/estimate/">Request an estimate</a>
          <a className="secondaryButton" href={`tel:${site.phone}`}>Call {site.phoneDisplay}</a>
        </div>
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
            <span>Source-backed feedback</span>
            <h2>Customer reviews will appear here as source-backed feedback is approved for public display.</h2>
            <p>This page is intentionally reserved for feedback that can be attributed to a real source. In the meantime, the best way to evaluate fit for your property is to talk through the roof or restoration problem directly with Intex.</p>
            <div className="heroActions">
              <a className="primaryButton light" href="/estimate/">Start a request</a>
              <a className="textLink" href={`tel:${site.phone}`}>Call {site.phoneDisplay} →</a>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
