import type { ResultSetHeader, RowDataPacket } from "mysql2";
import { getDatabase } from "@/lib/db";
import { publishedProjects as staticPublishedProjects, type Project } from "@/lib/projects";

type ProjectRow = RowDataPacket & {
  id: number;
  slug: string;
  title: string;
  service: string;
  property_type: "Residential" | "Commercial";
  location: string;
  summary: string;
  problem: string;
  solution: string;
  outcome: string;
  before_image: string;
  after_image: string;
  completed_at: Date | string | null;
  published: number;
};

export type AdminProject = Project & { id: number };

function mapProject(row: ProjectRow): AdminProject {
  const completedAt = row.completed_at
    ? row.completed_at instanceof Date
      ? row.completed_at.toISOString().slice(0, 10)
      : String(row.completed_at).slice(0, 10)
    : undefined;

  return {
    id: Number(row.id),
    slug: row.slug,
    title: row.title,
    service: row.service,
    propertyType: row.property_type,
    location: row.location,
    summary: row.summary,
    problem: row.problem,
    solution: row.solution,
    outcome: row.outcome,
    beforeImage: row.before_image,
    afterImage: row.after_image,
    completedAt,
    published: Boolean(row.published),
  };
}

const selectFields = `id, slug, title, service, property_type, location, summary, problem,
  solution, outcome, before_image, after_image, completed_at, published`;

export async function listPublicProjects(): Promise<Project[]> {
  const db = getDatabase();
  if (!db) return staticPublishedProjects;
  try {
    const [rows] = await db.query<ProjectRow[]>(
      `SELECT ${selectFields} FROM intex_projects WHERE published = 1 ORDER BY COALESCE(completed_at, created_at) DESC`,
    );
    return rows.map(mapProject);
  } catch {
    return staticPublishedProjects;
  }
}

export async function getPublicProjectBySlug(slug: string): Promise<Project | null> {
  const db = getDatabase();
  if (!db) return staticPublishedProjects.find((project) => project.slug === slug) || null;
  try {
    const [rows] = await db.execute<ProjectRow[]>(
      `SELECT ${selectFields} FROM intex_projects WHERE slug = ? AND published = 1 LIMIT 1`,
      [slug],
    );
    return rows[0] ? mapProject(rows[0]) : null;
  } catch {
    return staticPublishedProjects.find((project) => project.slug === slug) || null;
  }
}

export async function listAdminProjects(): Promise<AdminProject[]> {
  const db = getDatabase();
  if (!db) return [];
  const [rows] = await db.query<ProjectRow[]>(
    `SELECT ${selectFields} FROM intex_projects ORDER BY updated_at DESC`,
  );
  return rows.map(mapProject);
}

export async function getAdminProject(id: number): Promise<AdminProject | null> {
  const db = getDatabase();
  if (!db) return null;
  const [rows] = await db.execute<ProjectRow[]>(
    `SELECT ${selectFields} FROM intex_projects WHERE id = ? LIMIT 1`,
    [id],
  );
  return rows[0] ? mapProject(rows[0]) : null;
}

export type ProjectInput = Omit<Project, "published"> & { published: boolean };

export async function createProject(input: ProjectInput) {
  const db = getDatabase();
  if (!db) return null;
  const [result] = await db.execute<ResultSetHeader>(
    `INSERT INTO intex_projects
      (slug, title, service, property_type, location, summary, problem, solution, outcome,
       before_image, after_image, completed_at, published)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      input.slug,
      input.title,
      input.service,
      input.propertyType,
      input.location,
      input.summary,
      input.problem,
      input.solution,
      input.outcome,
      input.beforeImage,
      input.afterImage,
      input.completedAt || null,
      input.published ? 1 : 0,
    ],
  );
  return Number(result.insertId);
}

export async function updateProject(id: number, input: ProjectInput) {
  const db = getDatabase();
  if (!db) return false;
  const [result] = await db.execute<ResultSetHeader>(
    `UPDATE intex_projects SET
      slug = ?, title = ?, service = ?, property_type = ?, location = ?, summary = ?, problem = ?,
      solution = ?, outcome = ?, before_image = ?, after_image = ?, completed_at = ?, published = ?
     WHERE id = ? LIMIT 1`,
    [
      input.slug,
      input.title,
      input.service,
      input.propertyType,
      input.location,
      input.summary,
      input.problem,
      input.solution,
      input.outcome,
      input.beforeImage,
      input.afterImage,
      input.completedAt || null,
      input.published ? 1 : 0,
      id,
    ],
  );
  return result.affectedRows > 0;
}
