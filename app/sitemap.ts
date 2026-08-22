import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { servicePages } from "@/lib/services";

export default function sitemap(): MetadataRoute.Sitemap {
  const services = servicePages.map((service) => ({
    url: `${site.url}/${service.slug}/`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: service.slug === "roofing-chicago" ? 0.9 : 0.8,
  }));

  return [
    {
      url: site.url,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    ...services,
  ];
}
