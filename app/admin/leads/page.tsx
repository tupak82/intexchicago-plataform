import type { Metadata } from "next";
import { cookies } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { ADMIN_COOKIE, adminConfigured, validAdminSession } from "@/lib/admin-auth";
import { listAdminLeads } from "@/lib/admin-leads";
import { isDatabaseConfigured } from "@/lib/db";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Leads | Intex Platform Admin",
  robots: { index: false, follow: false },
};

export default async function AdminLeadsPage() {
  if (!adminConfigured()) notFound();
  const cookieStore = await cookies();
  if (!validAdminSession(cookieStore.get(ADMIN_COOKIE)?.value)) redirect("/admin/login/");

  const databaseConfigured = isDatabaseConfigured();
  let leads = [] as Awaited<ReturnType<typeof listAdminLeads>>;
  let databaseError = false;

  if (databaseConfigured) {
    try {
      leads = await listAdminLeads(150);
    } catch {
      databaseError = true;
    }
  }

  return (
    <main className="adminPage">
      <section className="adminHeader">
        <div>
          <span>Intex Platform · CRM</span>
          <h1>Leads</h1>
          <p>Customer requests stored in the private Intex database.</p>
        </div>
        <div className="adminHeaderActions">
          <a href="/admin/">Control Center</a>
          <a href="/">Website →</a>
        </div>
      </section>

      {!databaseConfigured ? (
        <section className="adminPanel adminSinglePanel">
          <div><span>Database</span><h2>MySQL is not configured yet.</h2></div>
          <p>Add the `INTEX_DB_*` environment variables and apply `db/schema.sql` before enabling database-backed lead management.</p>
        </section>
      ) : databaseError ? (
        <section className="adminPanel adminSinglePanel">
          <div><span>Database</span><h2>The database could not be reached.</h2></div>
          <p>Check Hostinger database credentials, network permissions, and whether the schema migration has been applied.</p>
        </section>
      ) : leads.length === 0 ? (
        <section className="adminPanel adminSinglePanel">
          <div><span>Lead inbox</span><h2>No leads stored yet.</h2></div>
          <p>Once the production estimate form is connected to MySQL, new requests will appear here.</p>
        </section>
      ) : (
        <section className="adminLeadList" aria-label="Lead inbox">
          {leads.map((lead) => (
            <a className="adminLeadRow" href={`/admin/leads/${lead.id}/`} key={lead.id}>
              <div>
                <span className={`adminStatus status-${lead.status}`}>{lead.status}</span>
                <strong>{lead.name}</strong>
                <small>{lead.service} · {lead.propertyType} · {lead.zip}</small>
              </div>
              <div className="adminLeadMeta">
                <span>{lead.emergency}</span>
                <time>{new Date(lead.createdAt).toLocaleString("en-US", { timeZone: "America/Chicago" })}</time>
              </div>
            </a>
          ))}
        </section>
      )}
    </main>
  );
}
