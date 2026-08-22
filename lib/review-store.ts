import type { ResultSetHeader, RowDataPacket } from "mysql2";
import { getDatabase } from "@/lib/db";
import { publishableReviews as staticReviews, type VerifiedReview } from "@/lib/reviews";

type ReviewRow = RowDataPacket & {
  id: number;
  reviewer_name: string;
  quote_text: string;
  rating: number | string | null;
  source_name: string;
  source_url: string;
  reviewed_at: Date | string | null;
  verified: number;
  permission_to_display: number;
  published: number;
};

export type AdminReview = {
  id: number;
  reviewerName: string;
  text: string;
  rating: number | null;
  source: string;
  sourceUrl: string;
  publishedAt?: string;
  verified: boolean;
  permissionToDisplay: boolean;
  published: boolean;
};

function mapReview(row: ReviewRow): AdminReview {
  const publishedAt = row.reviewed_at
    ? row.reviewed_at instanceof Date
      ? row.reviewed_at.toISOString().slice(0, 10)
      : String(row.reviewed_at).slice(0, 10)
    : undefined;

  return {
    id: Number(row.id),
    reviewerName: row.reviewer_name,
    text: row.quote_text,
    rating: row.rating === null ? null : Number(row.rating),
    source: row.source_name,
    sourceUrl: row.source_url,
    publishedAt,
    verified: Boolean(row.verified),
    permissionToDisplay: Boolean(row.permission_to_display),
    published: Boolean(row.published),
  };
}

const selectFields = `id, reviewer_name, quote_text, rating, source_name, source_url,
  reviewed_at, verified, permission_to_display, published`;

export async function listPublicReviews(): Promise<VerifiedReview[]> {
  const db = getDatabase();
  if (!db) return staticReviews;
  try {
    const [rows] = await db.query<ReviewRow[]>(
      `SELECT ${selectFields}
         FROM intex_reviews
        WHERE published = 1 AND verified = 1 AND permission_to_display = 1
        ORDER BY COALESCE(reviewed_at, created_at) DESC`,
    );
    return rows.map((row) => {
      const review = mapReview(row);
      return {
        id: String(review.id),
        reviewerName: review.reviewerName,
        rating: review.rating || 0,
        text: review.text,
        source: review.source,
        sourceUrl: review.sourceUrl || undefined,
        publishedAt: review.publishedAt,
        verified: review.verified,
        permissionToDisplay: review.permissionToDisplay,
      };
    });
  } catch {
    return staticReviews;
  }
}

export async function listAdminReviews(): Promise<AdminReview[]> {
  const db = getDatabase();
  if (!db) return [];
  const [rows] = await db.query<ReviewRow[]>(`SELECT ${selectFields} FROM intex_reviews ORDER BY updated_at DESC`);
  return rows.map(mapReview);
}

export async function getAdminReview(id: number): Promise<AdminReview | null> {
  const db = getDatabase();
  if (!db) return null;
  const [rows] = await db.execute<ReviewRow[]>(`SELECT ${selectFields} FROM intex_reviews WHERE id = ? LIMIT 1`, [id]);
  return rows[0] ? mapReview(rows[0]) : null;
}

export type ReviewInput = Omit<AdminReview, "id">;

export async function createReview(input: ReviewInput) {
  const db = getDatabase();
  if (!db) return null;
  const [result] = await db.execute<ResultSetHeader>(
    `INSERT INTO intex_reviews
      (reviewer_name, quote_text, rating, source_name, source_url, reviewed_at, verified, permission_to_display, published)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      input.reviewerName,
      input.text,
      input.rating,
      input.source,
      input.sourceUrl,
      input.publishedAt || null,
      input.verified ? 1 : 0,
      input.permissionToDisplay ? 1 : 0,
      input.published ? 1 : 0,
    ],
  );
  return Number(result.insertId);
}

export async function updateReview(id: number, input: ReviewInput) {
  const db = getDatabase();
  if (!db) return false;
  const [result] = await db.execute<ResultSetHeader>(
    `UPDATE intex_reviews SET reviewer_name = ?, quote_text = ?, rating = ?, source_name = ?, source_url = ?,
      reviewed_at = ?, verified = ?, permission_to_display = ?, published = ? WHERE id = ? LIMIT 1`,
    [
      input.reviewerName,
      input.text,
      input.rating,
      input.source,
      input.sourceUrl,
      input.publishedAt || null,
      input.verified ? 1 : 0,
      input.permissionToDisplay ? 1 : 0,
      input.published ? 1 : 0,
      id,
    ],
  );
  return result.affectedRows > 0;
}
