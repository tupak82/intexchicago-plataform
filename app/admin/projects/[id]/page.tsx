import type { Metadata } from "next";
import { cookies } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { ADMIN_COOKIE, adminConfigured, validAdminSession } from "@/lib/admin-auth";
import { getAdminProject } from "@/lib/project-store";
import ProjectForm from "../ProjectForm";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Edit Project | Intex Platform Admin",
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
  project_not_found: "This project could not be found in the database.",
  save_failed: "The project could not be saved. Check database availability and try again.",
};

export default async function EditProjectPage({
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
  const projectId = Number(id);
  if (!Number.isInteger(projectId) || projectId <= 0) notFound();

  let project = null;
  try {
    project = await getAdminProject(projectId);
  } catch {
    project = null;
  }
  if (!project) notFound();

  return (
    <main className="adminPage">
      <section className="adminHeader">
        <div>
          <span>Project #{project.id}</span>
          <h1>{project.title}</h1>
          <p>{project.published ? "Published case study" : "Draft case study"}</p>
        </div>
        <div className="adminHeaderActions">
          {project.published ? <a href={`/projects/${project.slug}/`} target="_blank" rel="noreferrer">View public →</a> : null}
          <a href="/admin/projects/">← Projects</a>
        </div>
      </section>
      {saved ? <div className="adminNotice success">Project saved successfully.</div> : null}
      {error ? <div className="adminNotice error" role="alert">{messages[error] || "The project could not be saved."}</div> : null}
      <section className="adminEditorShell"><ProjectForm project={project} /></section>
    </main>
  );
}
