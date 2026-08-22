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

export default async function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
  if (!adminConfigured()) notFound();
  const cookieStore = await cookies();
  if (!validAdminSession(cookieStore.get(ADMIN_COOKIE)?.value)) redirect("/admin/login/");

  const { id } = await params;
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
      <section className="adminEditorShell"><ProjectForm project={project} /></section>
    </main>
  );
}
