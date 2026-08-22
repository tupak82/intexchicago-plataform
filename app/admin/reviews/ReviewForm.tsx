import type { AdminReview } from "@/lib/review-store";

export default function ReviewForm({ review }: { review?: AdminReview | null }) {
  const action = review ? `/api/admin/reviews/${review.id}/` : "/api/admin/reviews/";

  return (
    <form className="adminEditorForm" action={action} method="post">
      <div className="adminEditorGrid">
        <label>
          Reviewer name
          <input name="reviewerName" required defaultValue={review?.reviewerName || ""} placeholder="Customer name or approved display name" />
        </label>
        <label>
          Rating
          <input name="rating" type="number" min="1" max="5" step="0.1" defaultValue={review?.rating ?? ""} placeholder="5.0" />
        </label>
        <label>
          Source
          <input name="source" required defaultValue={review?.source || ""} placeholder="Google, BBB, direct customer permission..." />
        </label>
        <label>
          Review date
          <input name="publishedAt" type="date" defaultValue={review?.publishedAt || ""} />
        </label>
      </div>

      <label>
        Source URL
        <input name="sourceUrl" type="url" defaultValue={review?.sourceUrl || ""} placeholder="https://..." />
      </label>

      <label>
        Review text
        <textarea name="text" rows={8} required defaultValue={review?.text || ""} placeholder="Enter only the verified review text you are permitted to display." />
      </label>

      <div className="adminVerificationGrid">
        <label className="adminPublishToggle">
          <input name="verified" type="checkbox" value="true" defaultChecked={review?.verified || false} />
          <span><strong>Source verified</strong><small>The reviewer/source/rating/text have been matched to reliable evidence.</small></span>
        </label>
        <label className="adminPublishToggle">
          <input name="permissionToDisplay" type="checkbox" value="true" defaultChecked={review?.permissionToDisplay || false} />
          <span><strong>Permission to display</strong><small>Intex has permission/right to reproduce this review on its own website.</small></span>
        </label>
        <label className="adminPublishToggle">
          <input name="published" type="checkbox" value="true" defaultChecked={review?.published || false} />
          <span><strong>Publish review</strong><small>Publication is blocked server-side unless verification and display permission are both enabled.</small></span>
        </label>
      </div>

      <div className="adminEditorActions">
        <a href="/admin/reviews/">Cancel</a>
        <button type="submit">{review ? "Save review" : "Create review"}</button>
      </div>
    </form>
  );
}
