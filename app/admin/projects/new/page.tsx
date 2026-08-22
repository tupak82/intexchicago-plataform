import type { Metadata } from "next";
import { cookies } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { ADMIN_COOKIE, adminConfigured, validAdminSession } from "@/lib/admin-auth";
import ProjectForm from "../ProjectForm";

export const metadata: Metadata = {
  title: "New Project | Intex Platform Admin",
  robots: { index: false, follow: false },
};

const messages: Record<string, string> = {
  invalid_slug: "Use a lowercase URL slug with letters, numbers, and hyphens only.",
  missing_required_fields: "Complete all required project fields before saving.",
  invalid_property_type: "Choose Residential or Commercial.",
  invalid_completion_date: "Use a valid completion date.",
  published_project_requires_images: "A published project requires verified before and after images.",
  invalid_project_image_url: "Before and after images must use valid URLs.",
  duplicate_slug: "That project URL slug is already in use.",
  database_not_configured: "The project database is not configured yet.",
  save_failed: "The project could not be saved. Check database availability and try again.",
};

export default async function NewProjectPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  if (!adminConfigured()) notFound();
  const cookieStore = await cookies();
  if (!validAdminSession(cookieStore.get(ADMIN_COOKIE)?.value)) redirect("/admin/login/");
  const { error } = await searchParams;

  return (
    <main className="adminPage">
      <section className="adminHeader">
        <div>
          <span>Intex Platform · CMS</span>
          <h1>New project</h1>
          <p>Create as draft first. Publish only after project facts and image permissions are verified.</p>
        </div>
        <div className="adminHeaderActions"><a href="/admin/projects/">← Projects</a></div>
      </section>
      {error ? <div className="adminNotice error" role="alert">{messages[error] || "The project could not be saved."}</div> : null}
      <section className="adminEditorShell"><ProjectForm /></section>
    </main>
  );
}
