import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { publishedProjects } from "@/lib/projects";
import { serviceAreas } from "@/lib/service-areas";
import { servicePages } from "@/lib/services";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Intex Platform Admin",
  robots: { index: false, follow: false },
};

export default function AdminPage() {
  if (process.env.INTEX_ADMIN_ENABLED !== "true") notFound();

  const leadBackendReady = Boolean(process.env.INTEX_LEADS_WEBHOOK_URL);
  const publishedAreas = serviceAreas.filter((area) => area.indexable);

  return (
    <main className="adminPage">
      <section className="adminHeader">
        <div>
          <span>Intex Platform</span>
          <h1>Migration Control Center</h1>
          <p>Operational readiness for the WordPress-to-platform migration.</p>
        </div>
        <a href="/">View website →</a>
      </section>

      <section className="adminStats">
        <article><span>Service routes</span><strong>{servicePages.length}</strong><small>SEO service pages configured</small></article>
        <article><span>Service areas</span><strong>{publishedAreas.length}</strong><small>Verified/indexable locations</small></article>
        <article><span>Projects</span><strong>{publishedProjects.length}</strong><small>Verified public case studies</small></article>
        <article><span>Lead backend</span><strong>{leadBackendReady ? "Ready" : "Needs config"}</strong><small>INTEX_LEADS_WEBHOOK_URL</small></article>
      </section>

      <section className="adminPanel">
        <div>
          <span>Cutover gates</span>
          <h2>Do not switch the domain until these are green.</h2>
        </div>
        <ul>
          <li className={leadBackendReady ? "ready" : "pending"}>Lead persistence and notification destination</li>
          <li className="pending">Legacy WordPress URL export and 301 redirect map</li>
          <li className="pending">Claims, licensing, review rating and guarantee verification</li>
          <li className="pending">Project photo migration and permissions review</li>
          <li className="pending">Analytics / Search Console production configuration</li>
          <li className="pending">Final security, accessibility, performance and mobile QA</li>
        </ul>
      </section>
    </main>
  );
}
