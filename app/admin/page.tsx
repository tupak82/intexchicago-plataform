import type { Metadata } from "next";
import { cookies } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { publishedProjects } from "@/lib/projects";
import { serviceAreas } from "@/lib/service-areas";
import { servicePages } from "@/lib/services";
import { publishedResources } from "@/lib/resources";
import { publishableReviews } from "@/lib/reviews";
import { legacyQueryRedirects, legacyRedirects } from "@/lib/legacy-redirects";
import { cmsCollections } from "@/lib/cms";
import { ADMIN_COOKIE, adminConfigured, validAdminSession } from "@/lib/admin-auth";
import { databasePing } from "@/lib/db";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Intex Platform Admin",
  robots: { index: false, follow: false },
};

export default async function AdminPage() {
  if (!adminConfigured()) notFound();

  const cookieStore = await cookies();
  if (!validAdminSession(cookieStore.get(ADMIN_COOKIE)?.value)) redirect("/admin/login/");

  const database = await databasePing();
  const webhookConfigured = Boolean(process.env.INTEX_LEADS_WEBHOOK_URL);
  const leadBackendReady = database.reachable || webhookConfigured;
  const publishedAreas = serviceAreas.filter((area) => area.indexable);
  const redirectCount = legacyRedirects.length + legacyQueryRedirects.length;

  return (
    <main className="adminPage">
      <section className="adminHeader">
        <div>
          <span>Intex Platform</span>
          <h1>Migration Control Center</h1>
          <p>Operational readiness for the WordPress-to-platform migration.</p>
        </div>
        <div className="adminHeaderActions">
          <a href="/admin/leads/">Lead inbox</a>
          <a href="/">View website →</a>
          <form action="/api/admin/logout/" method="post"><button type="submit">Sign out</button></form>
        </div>
      </section>

      <section className="adminStats">
        <article><span>Service routes</span><strong>{servicePages.length}</strong><small>SEO service pages configured</small></article>
        <article><span>Service areas</span><strong>{publishedAreas.length}</strong><small>Verified/indexable locations</small></article>
        <article><span>Projects</span><strong>{publishedProjects.length}</strong><small>Verified public case studies</small></article>
        <article><span>Resources</span><strong>{publishedResources.length}</strong><small>Published educational guides</small></article>
        <article><span>Verified reviews</span><strong>{publishableReviews.length}</strong><small>No fabricated review content</small></article>
        <article><span>301 redirects</span><strong>{redirectCount}</strong><small>Verified WordPress routes mapped</small></article>
        <article><span>MySQL</span><strong>{database.reachable ? "Online" : database.configured ? "Offline" : "Needs config"}</strong><small>Owned lead + CMS data store</small></article>
        <article><span>Lead intake</span><strong>{leadBackendReady ? "Ready" : "Needs config"}</strong><small>{database.reachable ? "Stored in MySQL" : webhookConfigured ? "Webhook fallback" : "No destination"}</small></article>
      </section>

      <section className="adminPanel">
        <div>
          <span>Cutover gates</span>
          <h2>Do not switch the domain until these are green.</h2>
        </div>
        <ul>
          <li className={database.reachable ? "ready" : "pending"}>Owned MySQL persistence and admin lead inbox</li>
          <li className={leadBackendReady ? "ready" : "pending"}>Lead intake destination available</li>
          <li className={redirectCount > 0 ? "ready" : "pending"}>First verified WordPress 301 redirect set</li>
          <li className="pending">Full WordPress URL export and Search Console cross-check</li>
          <li className="pending">Claims, licensing, review rating and guarantee verification</li>
          <li className="pending">Project photo migration and permissions review</li>
          <li className="pending">Analytics / Search Console production configuration</li>
          <li className="pending">Final security, accessibility, performance and mobile QA</li>
        </ul>
      </section>
    </main>
  );
}
