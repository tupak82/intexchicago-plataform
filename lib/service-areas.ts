export type ServiceArea = {
  slug: string;
  name: string;
  title: string;
  description: string;
  intro: string;
  indexable: boolean;
  highlights: string[];
};

export const serviceAreas: ServiceArea[] = [
  {
    slug: "chicago",
    name: "Chicago",
    title: "Restoration & Roofing Services in Chicago",
    description:
      "Intex Restoration provides roofing and property restoration services for residential and commercial properties in Chicago.",
    intro:
      "Intex serves property owners and managers in Chicago with roofing, water, fire, storm, mold, and commercial restoration support. Additional municipality pages will only be published after service coverage and local content are verified.",
    indexable: true,
    highlights: [
      "Residential property restoration",
      "Commercial restoration coordination",
      "Roof repair and storm-damage support",
      "Water, fire, smoke, and mold restoration",
    ],
  },
];

export const serviceAreaBySlug = Object.fromEntries(
  serviceAreas.map((area) => [area.slug, area]),
) as Record<string, ServiceArea>;
