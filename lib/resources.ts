export type ResourceSection = {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
};

export type ResourceArticle = {
  slug: string;
  title: string;
  description: string;
  category: "Roofing" | "Water Damage" | "Insurance Claims" | "Emergency Guides";
  publishedAt: string;
  updatedAt: string;
  published: boolean;
  sections: ResourceSection[];
};

export const resourceArticles: ResourceArticle[] = [
  {
    slug: "what-to-do-after-storm-roof-damage-chicago",
    title: "What to Do After Storm Roof Damage in Chicago",
    description: "A practical first-step guide for Chicago property owners after wind, hail, or storm-related roof damage.",
    category: "Roofing",
    publishedAt: "2026-08-22",
    updatedAt: "2026-08-22",
    published: true,
    sections: [
      {
        heading: "Protect people before the property",
        paragraphs: [
          "If a storm has damaged the roof, first keep people away from sagging ceilings, exposed wiring, standing water, broken glass, and any area where materials may fall. If the structure appears unsafe, leave the affected area and contact the appropriate emergency service before attempting cleanup.",
        ],
      },
      {
        heading: "Document the damage without creating more risk",
        paragraphs: [
          "Take photos or video from safe locations. Capture the exterior, interior leaks, damaged ceilings, visible debris, and affected personal property. Avoid climbing onto a wet, icy, steep, or visibly damaged roof simply to get documentation.",
        ],
        bullets: [
          "Record the date and approximate time of the storm",
          "Photograph water entry and interior damage",
          "Keep receipts for reasonable temporary protection or cleanup",
          "Save claim numbers and contractor communications in one place",
        ],
      },
      {
        heading: "Use temporary protection carefully",
        paragraphs: [
          "Temporary tarping or emergency weatherproofing can help prevent additional water intrusion, but roof access can be dangerous. For significant openings, steep roofs, or active weather, use a qualified professional rather than improvising a repair from a ladder.",
        ],
      },
    ],
  },
  {
    slug: "first-steps-after-water-damage",
    title: "First Steps After Water Damage in Your Property",
    description: "What to prioritize when water enters a home or commercial property, from safety to documentation and drying.",
    category: "Water Damage",
    publishedAt: "2026-08-22",
    updatedAt: "2026-08-22",
    published: true,
    sections: [
      {
        heading: "Stop the source when it is safe to do so",
        paragraphs: [
          "If the water is coming from a plumbing fixture or supply line and you can safely reach the shutoff, stop the flow. Do not enter standing water when electrical hazards may be present, and do not handle contaminated water without appropriate protection.",
        ],
      },
      {
        heading: "Separate emergency actions from restoration decisions",
        paragraphs: [
          "The immediate goal is to reduce additional damage and establish safe conditions. Extraction, drying, material removal, cleaning, and reconstruction should be based on the source of the water, the materials affected, and how long they have remained wet.",
        ],
      },
      {
        heading: "Create a simple record",
        paragraphs: [
          "Photograph affected rooms before moving items when possible. Note when the loss was discovered, the suspected source, and any actions already taken. This record is useful for contractors, property managers, and insurance conversations.",
        ],
      },
    ],
  },
  {
    slug: "property-damage-insurance-claim-documentation",
    title: "How to Document Property Damage for an Insurance Claim",
    description: "A straightforward documentation checklist for property owners after roofing, water, fire, or storm damage.",
    category: "Insurance Claims",
    publishedAt: "2026-08-22",
    updatedAt: "2026-08-22",
    published: true,
    sections: [
      {
        heading: "Build a timeline",
        paragraphs: [
          "Write down when the damage happened or was discovered, what you observed, and what temporary steps were taken. Keep the claim number, adjuster information, contractor estimates, and receipts together so the sequence is easy to follow.",
        ],
      },
      {
        heading: "Photograph conditions before major cleanup",
        paragraphs: [
          "When it is safe, photograph the overall room or exterior first and then closer details. Include damaged building materials and affected contents. Do not delay necessary emergency work solely to create documentation when doing so would increase damage or create a safety hazard.",
        ],
      },
      {
        heading: "Keep estimates factual",
        paragraphs: [
          "A useful restoration or roofing estimate should identify observed conditions and the proposed scope of work. Coverage decisions belong to the insurer and the policy; contractors can document property conditions and repair needs without promising that a particular item will be covered.",
        ],
      },
    ],
  },
];

export const publishedResources = resourceArticles.filter((article) => article.published);
export const resourceBySlug = Object.fromEntries(
  publishedResources.map((article) => [article.slug, article]),
) as Record<string, ResourceArticle>;
