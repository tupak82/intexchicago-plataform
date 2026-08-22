import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { servicePages } from "@/lib/services";
import { serviceAreas } from "@/lib/service-areas";
import { publishedResources } from "@/lib/resources";
import { listPublicProjects } from "@/lib/project-store";
import { listPublicReviews } from "@/lib/review-store";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [publishedProjects, publicReviews] = await Promise.all([
    listPublicProjects(),
    listPublicReviews(),
  ]);

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: site.url, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${site.url}/about/`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.6 },
    { url: `${site.url}/contact/`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.6 },
    { url: `${site.url}/privacy/`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
    { url: `${site.url}/service-areas/`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${site.url}/projects/`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${site.url}/resources/`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    ...(publicReviews.length
      ? [{ url: `${site.url}/reviews/`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.6 }]
      : []),
  ];

  const services: MetadataRoute.Sitemap = servicePages.map((service) => ({
    url: `${site.url}/${service.slug}/`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: service.slug === "roofing-chicago" ? 0.9 : 0.8,
  }));

  const areas: MetadataRoute.Sitemap = serviceAreas
    .filter((area) => area.indexable)
    .map((area) => ({
      url: `${site.url}/service-areas/${area.slug}/`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    }));

  const projects: MetadataRoute.Sitemap = publishedProjects.map((project) => ({
    url: `${site.url}/projects/${project.slug}/`,
    lastModified: project.completedAt ? new Date(project.completedAt) : new Date(),
    changeFrequency: "yearly",
    priority: 0.6,
  }));

  const resources: MetadataRoute.Sitemap = publishedResources.map((article) => ({
    url: `${site.url}/resources/${article.slug}/`,
    lastModified: new Date(article.updatedAt),
    changeFrequency: "yearly",
    priority: 0.65,
  }));

  return [...staticRoutes, ...services, ...areas, ...projects, ...resources];
}
