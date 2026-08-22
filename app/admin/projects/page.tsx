import type { Metadata } from "next";
import { cookies } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { ADMIN_COOKIE, adminConfigured, validAdminSession } from "@/lib/admin-auth";
import { listAdminProjects } from "@/lib/project-store";
import { isDatabaseConfigured } from "@/lib/db";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Projects CMS | Intex Platform Admin",
  robots: { index: false, follow: false },
};

export default async function AdminProjectsPage() {
  if (!adminConfigured()) notFound();
  const cookieStore = await cookies();
  if (!validAdminSession(cookieStore.get(ADMIN_COOKIE)?.value)) redirect("/admin/login/");

  const databaseConfigured = isDatabaseConfigured();
  let projects = [] as Awaited<ReturnType<typeof listAdminProjects>>;
  let databaseError = false;
  if (databaseConfigured) {
    try {
      projects = await listAdminProjects();
    } catch {
      databaseError = true;
    }
  }

  return (
    <main className="adminPage">
      <section className="adminHeader">
        <div>
          <span>Intex Platform · CMS</span>
          <h1>Projects</h1>
          <p>Create verified restoration and roofing case studies without touching code.</p>
        </div>
        <div className="adminHeaderActions">
          <a href="/admin/projects/new/">+ New project</a>
          <a href="/admin/">Control Center</a>
        </div>
      </section>

      {!databaseConfigured || databaseError ? (
        <section className="adminPanel adminSinglePanel">
          <div><span>Database</span><h2>{databaseError ? "Project storage is unreachable." : "MySQL is not configured yet."}</h2></div>
          <p>Configure the private Intex database and apply `db/schema.sql` before using the project editor.</p>
        </section>
      ) : projects.length === 0 ? (
        <section className="adminPanel adminSinglePanel">
          <div><span>Project library</span><h2>No projects have been added yet.</h2></div>
          <p>Add the first project only after its details and media rights have been verified.</p>
        </section>
      ) : (
        <section className="adminContentList">
          {projects.map((project) => (
            <a href={`/admin/projects/${project.id}/`} className="adminContentRow" key={project.id}>
              <div><span className={project.published ? "adminStatus status-closed" : "adminStatus"}>{project.published ? "published" : "draft"}</span><strong>{project.title}</strong><small>{project.service} · {project.location}</small></div>
              <span>Edit →</span>
            </a>
          ))}
        </section>
      )}
    </main>
  );
}
