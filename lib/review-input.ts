import type { ReviewInput } from "@/lib/review-store";

export type ReviewInputResult =
  | { ok: true; value: ReviewInput }
  | { ok: false; error: string };

function text(form: FormData, key: string) {
  return String(form.get(key) || "").trim();
}

export function parseReviewInput(form: FormData): ReviewInputResult {
  const reviewerName = text(form, "reviewerName");
  const quote = text(form, "text");
  const source = text(form, "source");
  const sourceUrl = text(form, "sourceUrl");
  const publishedAt = text(form, "publishedAt") || undefined;
  const ratingText = text(form, "rating");
  const verified = form.get("verified") === "true";
  const permissionToDisplay = form.get("permissionToDisplay") === "true";
  const published = form.get("published") === "true";

  if (!reviewerName || !quote || !source) return { ok: false, error: "missing_required_fields" };

  let rating: number | null = null;
  if (ratingText) {
    rating = Number(ratingText);
    if (!Number.isFinite(rating) || rating < 1 || rating > 5) return { ok: false, error: "invalid_rating" };
  }

  if (sourceUrl) {
    try {
      const parsed = new URL(sourceUrl);
      if (!/^https?:$/.test(parsed.protocol)) throw new Error("invalid protocol");
    } catch {
      return { ok: false, error: "invalid_source_url" };
    }
  }

  if (publishedAt && !/^\d{4}-\d{2}-\d{2}$/.test(publishedAt)) {
    return { ok: false, error: "invalid_review_date" };
  }

  if (published && (!verified || !permissionToDisplay)) {
    return { ok: false, error: "publish_requires_verification_and_permission" };
  }

  return {
    ok: true,
    value: {
      reviewerName: reviewerName.slice(0, 160),
      text: quote.slice(0, 10_000),
      rating,
      source: source.slice(0, 120),
      sourceUrl: sourceUrl.slice(0, 1024),
      publishedAt,
      verified,
      permissionToDisplay,
      published,
    },
  };
}
