import { getDatabase, isDatabaseConfigured } from "@/lib/db";
import type { LeadPayload } from "@/lib/leads";

type NormalizedLead = LeadPayload & {
  email: string;
  sourcePage: string;
  receivedAt: string;
};

export function isLeadDatabaseConfigured() {
  return isDatabaseConfigured();
}

export async function storeLead(lead: NormalizedLead) {
  const db = getDatabase();
  if (!db) return { stored: false as const, reason: "database_not_configured" as const };

  const [result] = await db.execute<{
    insertId: number;
  } & Record<string, unknown>>(
    `INSERT INTO intex_leads
      (service, emergency, property_type, zip, name, phone, email, description, preferred_contact, consent, source_page)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      lead.service,
      lead.emergency,
      lead.propertyType,
      lead.zip,
      lead.name,
      lead.phone,
      lead.email,
      lead.description,
      lead.preferredContact,
      lead.consent ? 1 : 0,
      lead.sourcePage,
    ],
  );

  return { stored: true as const, id: Number(result.insertId) };
}
