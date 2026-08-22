import type { Metadata } from "next";
import { cookies } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { ADMIN_COOKIE, adminConfigured, validAdminSession } from "@/lib/admin-auth";
import ProjectForm from "../ProjectForm";

export const metadata: Metadata = {
  title: "New Project | Intex Platform Admin",
  robots: { index: false, follow: false },
};

export default async function NewProjectPage() {
  if (!adminConfigured()) notFound();
  const cookieStore = await cookies();
  if (!validAdminSession(cookieStore.get(ADMIN_COOKIE)?.value)) redirect("/admin/login/");

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
      <section className="adminEditorShell"><ProjectForm /></section>
    </main>
  );
}
