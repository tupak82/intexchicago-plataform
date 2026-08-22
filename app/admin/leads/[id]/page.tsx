import type { Metadata } from "next";
import { cookies } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { ADMIN_COOKIE, adminConfigured, validAdminSession } from "@/lib/admin-auth";
import { getAdminLead, leadStatuses } from "@/lib/admin-leads";
import { site } from "@/lib/site";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Lead | Intex Platform Admin",
  robots: { index: false, follow: false },
};

export default async function AdminLeadPage({ params }: { params: Promise<{ id: string }> }) {
  if (!adminConfigured()) notFound();
  const cookieStore = await cookies();
  if (!validAdminSession(cookieStore.get(ADMIN_COOKIE)?.value)) redirect("/admin/login/");

  const { id } = await params;
  const leadId = Number(id);
  if (!Number.isInteger(leadId) || leadId <= 0) notFound();

  let lead = null;
  try {
    lead = await getAdminLead(leadId);
  } catch {
    lead = null;
  }
  if (!lead) notFound();

  return (
    <main className="adminPage">
      <section className="adminHeader">
        <div>
          <span>Lead #{lead.id}</span>
          <h1>{lead.name}</h1>
          <p>{lead.service} · {lead.propertyType} · ZIP {lead.zip}</p>
        </div>
        <div className="adminHeaderActions">
          <a href="/admin/leads/">← Lead inbox</a>
          <a href="/admin/">Control Center</a>
        </div>
      </section>

      <section className="adminLeadDetail">
        <div className="adminLeadPrimary">
          <article className="adminLeadCard">
            <span>Request</span>
            <h2>{lead.service}</h2>
            <p>{lead.description}</p>
          </article>

          <article className="adminLeadCard">
            <span>Contact</span>
            <dl>
              <div><dt>Phone</dt><dd><a href={`tel:${lead.phone}`}>{lead.phone}</a></dd></div>
              <div><dt>Email</dt><dd>{lead.email ? <a href={`mailto:${lead.email}`}>{lead.email}</a> : "Not provided"}</dd></div>
              <div><dt>Preferred</dt><dd>{lead.preferredContact}</dd></div>
              <div><dt>Consent</dt><dd>{lead.consent ? "Recorded" : "Not recorded"}</dd></div>
            </dl>
          </article>

          <article className="adminLeadCard">
            <span>Context</span>
            <dl>
              <div><dt>Emergency</dt><dd>{lead.emergency}</dd></div>
              <div><dt>Property</dt><dd>{lead.propertyType}</dd></div>
              <div><dt>ZIP</dt><dd>{lead.zip}</dd></div>
              <div><dt>Source</dt><dd>{lead.sourcePage}</dd></div>
              <div><dt>Received</dt><dd>{new Date(lead.createdAt).toLocaleString("en-US", { timeZone: "America/Chicago" })}</dd></div>
            </dl>
          </article>
        </div>

        <aside className="adminLeadWorkflow">
          <form action={`/api/admin/leads/${lead.id}/`} method="post">
            <span>Workflow</span>
            <h2>Update lead</h2>
            <label>
              Status
              <select name="status" defaultValue={lead.status}>
                {leadStatuses.map((status) => <option key={status} value={status}>{status}</option>)}
              </select>
            </label>
            <label>
              Internal notes
              <textarea name="notes" rows={10} defaultValue={lead.notes} placeholder="Add private follow-up notes..." />
            </label>
            <button type="submit">Save changes</button>
          </form>
          <div className="adminLeadQuickActions">
            <a href={`tel:${lead.phone}`}>Call customer</a>
            {lead.email ? <a href={`mailto:${lead.email}`}>Email customer</a> : null}
            <a href={`tel:${site.phone}`}>Call Intex line</a>
          </div>
        </aside>
      </section>
    </main>
  );
}
