export type CmsCollection = {
  key: string;
  label: string;
  description: string;
  publicContent: boolean;
  requiresVerification?: boolean;
};

export const cmsCollections: CmsCollection[] = [
  { key: "services", label: "Services", description: "SEO service pages and related-service relationships.", publicContent: true },
  { key: "serviceAreas", label: "Service Areas", description: "Verified locations, local copy, and indexability controls.", publicContent: true, requiresVerification: true },
  { key: "projects", label: "Projects", description: "Before/after case studies, property type, scope, outcome, and media.", publicContent: true, requiresVerification: true },
  { key: "reviews", label: "Reviews", description: "Source-backed testimonials and ratings with display permission.", publicContent: true, requiresVerification: true },
  { key: "resources", label: "Resources", description: "Roofing, restoration, emergency, and insurance guides.", publicContent: true },
  { key: "leads", label: "Leads", description: "Private estimate and emergency requests with status and assignment.", publicContent: false },
  { key: "redirects", label: "Legacy Redirects", description: "Verified WordPress-to-platform 301 mappings.", publicContent: false, requiresVerification: true },
  { key: "siteSettings", label: "Site Settings", description: "Canonical contact details, SEO defaults, and feature flags.", publicContent: false },
];
