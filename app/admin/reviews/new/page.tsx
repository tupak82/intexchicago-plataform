import type { Metadata } from "next";
import { cookies } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { ADMIN_COOKIE, adminConfigured, validAdminSession } from "@/lib/admin-auth";
import ReviewForm from "../ReviewForm";

export const metadata: Metadata = {
  title: "New Review | Intex Platform Admin",
  robots: { index: false, follow: false },
};

const messages: Record<string, string> = {
  missing_required_fields: "Reviewer name, source, and review text are required.",
  invalid_rating: "Rating must be between 1 and 5.",
  invalid_source_url: "Use a valid http/https source URL.",
  invalid_review_date: "Use a valid review date.",
  publish_requires_verification_and_permission: "A review cannot be published until source verification and display permission are both confirmed.",
  database_not_configured: "The review database is not configured yet.",
  save_failed: "The review could not be saved. Check database availability and try again.",
};

export default async function NewReviewPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  if (!adminConfigured()) notFound();
  const cookieStore = await cookies();
  if (!validAdminSession(cookieStore.get(ADMIN_COOKIE)?.value)) redirect("/admin/login/");
  const { error } = await searchParams;

  return (
    <main className="adminPage">
      <section className="adminHeader">
        <div><span>Intex Platform · CMS</span><h1>New review</h1><p>Create a record first; publication stays blocked until evidence and display rights are confirmed.</p></div>
        <div className="adminHeaderActions"><a href="/admin/reviews/">← Reviews</a></div>
      </section>
      {error ? <div className="adminNotice error" role="alert">{messages[error] || "The review could not be saved."}</div> : null}
      <section className="adminEditorShell"><ReviewForm /></section>
    </main>
  );
}
