export type Project = {
  slug: string;
  title: string;
  service: string;
  propertyType: "Residential" | "Commercial";
  location: string;
  summary: string;
  problem: string;
  solution: string;
  outcome: string;
  beforeImage: string;
  afterImage: string;
  completedAt?: string;
  published: boolean;
};

// Production projects are intentionally empty until legacy photos, locations,
// completion details, and permissions are verified during migration.
export const projects: Project[] = [];

export const publishedProjects = projects.filter((project) => project.published);
export const projectBySlug = Object.fromEntries(
  publishedProjects.map((project) => [project.slug, project]),
) as Record<string, Project>;
