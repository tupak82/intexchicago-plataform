export type VerifiedReview = {
  id: string;
  reviewerName: string;
  rating: number;
  text: string;
  source: string;
  sourceUrl?: string;
  publishedAt?: string;
  verified: boolean;
  permissionToDisplay: boolean;
};

// Do not add or render reviews until the source, rating, text, and display
// permission have been verified. AggregateRating schema must be derived only
// from verified records or a verified external source.
export const reviews: VerifiedReview[] = [];

export const publishableReviews = reviews.filter(
  (review) => review.verified && review.permissionToDisplay,
);
