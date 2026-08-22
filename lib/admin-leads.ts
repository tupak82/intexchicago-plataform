import type { RowDataPacket, ResultSetHeader } from "mysql2";
import { getDatabase } from "@/lib/db";

export const leadStatuses = ["new", "contacted", "qualified", "scheduled", "closed", "spam"] as const;
export type LeadStatus = (typeof leadStatuses)[number];

export type AdminLead = {
  id: number;
  createdAt: string;
  service: string;
  emergency: string;
  propertyType: string;
  zip: string;
  name: string;
  phone: string;
  email: string;
  description: string;
  preferredContact: string;
  consent: boolean;
  sourcePage: string;
  status: LeadStatus;
  notes: string;
};

type LeadRow = RowDataPacket & {
  id: number;
  created_at: Date | string;
  service: string;
  emergency: string;
  property_type: string;
  zip: string;
  name: string;
  phone: string;
  email: string;
  description: string;
  preferred_contact: string;
  consent: number;
  source_page: string;
  status: LeadStatus;
  notes: string | null;
};

function mapLead(row: LeadRow): AdminLead {
  return {
    id: Number(row.id),
    createdAt: row.created_at instanceof Date ? row.created_at.toISOString() : String(row.created_at),
    service: row.service,
    emergency: row.emergency,
    propertyType: row.property_type,
    zip: row.zip,
    name: row.name,
    phone: row.phone,
    email: row.email,
    description: row.description,
    preferredContact: row.preferred_contact,
    consent: Boolean(row.consent),
    sourcePage: row.source_page,
    status: row.status,
    notes: row.notes || "",
  };
}

export async function listAdminLeads(limit = 100) {
  const db = getDatabase();
  if (!db) return [];
  const safeLimit = Math.max(1, Math.min(250, Math.floor(limit)));
  const [rows] = await db.query<LeadRow[]>(
    `SELECT id, created_at, service, emergency, property_type, zip, name, phone, email,
            description, preferred_contact, consent, source_page, status, notes
       FROM intex_leads
      ORDER BY created_at DESC
      LIMIT ${safeLimit}`,
  );
  return rows.map(mapLead);
}

export async function getAdminLead(id: number) {
  const db = getDatabase();
  if (!db) return null;
  const [rows] = await db.execute<LeadRow[]>(
    `SELECT id, created_at, service, emergency, property_type, zip, name, phone, email,
            description, preferred_contact, consent, source_page, status, notes
       FROM intex_leads
      WHERE id = ?
      LIMIT 1`,
    [id],
  );
  return rows[0] ? mapLead(rows[0]) : null;
}

export async function updateAdminLead(id: number, status: LeadStatus, notes: string) {
  const db = getDatabase();
  if (!db) return false;
  const [result] = await db.execute<ResultSetHeader>(
    "UPDATE intex_leads SET status = ?, notes = ? WHERE id = ? LIMIT 1",
    [status, notes.slice(0, 10_000), id],
  );
  return result.affectedRows > 0;
}

export function isLeadStatus(value: string): value is LeadStatus {
  return leadStatuses.includes(value as LeadStatus);
}
