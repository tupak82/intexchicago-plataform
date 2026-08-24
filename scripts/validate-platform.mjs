import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const read = (file) => fs.readFileSync(path.join(root, file), "utf8");
const exists = (file) => fs.existsSync(path.join(root, file));
const failures = [];
const check = (condition, message) => {
  if (!condition) failures.push(message);
};

const redirects = read("lib/legacy-redirects.ts");
const sitemap = read("app/sitemap.ts");
const robots = read("app/robots.ts");
const site = read("lib/site.ts");
const homepage = read("app/page.tsx");
const leadRoute = read("app/api/leads/route.ts");
const projectInput = read("lib/project-input.ts");
const reviewInput = read("lib/review-input.ts");
const reviewStore = read("lib/review-store.ts");
const packageJson = JSON.parse(read("package.json"));
const schema = read("db/schema.sql");

const redirectSources = [...redirects.matchAll(/source:\s*"([^"]+)"/g)].map((m) => m[1]);
const redirectDestinations = [...redirects.matchAll(/destination:\s*"([^"]+)"/g)].map((m) => m[1]);

check(redirectSources.length >= 9, "Expected at least the verified legacy redirect set.");
check(new Set(redirectSources).size === redirectSources.length, "Legacy redirect sources must be unique.");
check(redirectDestinations.every((value) => value.startsWith("/")), "All redirect destinations must be internal absolute paths.");
check(!redirectDestinations.some((value) => value === "/"), "Do not blanket-redirect legacy content to the homepage.");

const criticalRoutes = [
  "app/page.tsx",
  "app/about/page.tsx",
  "app/contact/page.tsx",
  "app/estimate/page.tsx",
  "app/restoration/page.tsx",
  "app/projects/page.tsx",
  "app/projects/[slug]/page.tsx",
  "app/reviews/page.tsx",
  "app/resources/page.tsx",
  "app/service-areas/page.tsx",
  "app/privacy/page.tsx",
  "app/not-found.tsx",
  "app/admin/page.tsx",
  "app/admin/leads/page.tsx",
  "app/admin/leads/[id]/page.tsx",
  "app/admin/projects/page.tsx",
  "app/admin/projects/new/page.tsx",
  "app/admin/projects/[id]/page.tsx",
  "app/admin/reviews/page.tsx",
  "app/admin/reviews/new/page.tsx",
  "app/admin/reviews/[id]/page.tsx",
  "app/api/leads/route.ts",
  "app/api/admin/leads/[id]/route.ts",
  "app/api/admin/projects/route.ts",
  "app/api/admin/projects/[id]/route.ts",
  "app/api/admin/reviews/route.ts",
  "app/api/admin/reviews/[id]/route.ts",
  "app/api/health/route.ts",
];
for (const route of criticalRoutes) check(exists(route), `Missing critical route: ${route}`);

const criticalInfrastructure = [
  "lib/db.ts",
  "lib/lead-store.ts",
  "lib/admin-leads.ts",
  "lib/admin-auth.ts",
  "lib/request-security.ts",
  "lib/project-store.ts",
  "lib/project-input.ts",
  "lib/review-store.ts",
  "lib/review-input.ts",
  "db/schema.sql",
  "docs/HOSTINGER-DEPLOYMENT.md",
  "docs/ROLLBACK.md",
  "docs/CLAIMS-VERIFICATION.md",
];
for (const file of criticalInfrastructure) check(exists(file), `Missing critical infrastructure: ${file}`);

const adminMutationRoutes = [
  "app/api/admin/leads/[id]/route.ts",
  "app/api/admin/projects/route.ts",
  "app/api/admin/projects/[id]/route.ts",
  "app/api/admin/reviews/route.ts",
  "app/api/admin/reviews/[id]/route.ts",
];
for (const file of adminMutationRoutes) {
  const content = read(file);
  check(content.includes("isTrustedSameOriginRequest"), `Admin mutation must use shared same-origin protection: ${file}`);
  check(!content.includes("if (!origin) return true"), `Admin mutation must not trust missing Origin headers: ${file}`);
}

check(site.includes("info@intexchicago.com"), "Canonical Intex email is missing from site config.");
check(site.includes("+17738225892"), "Canonical Intex phone is missing from site config.");
check(sitemap.includes("/resources/"), "Resources hub must be included in sitemap.");
check(sitemap.includes("/restoration/"), "Restoration hub must be included in sitemap.");
check(sitemap.includes("/service-areas/"), "Service areas must be included in sitemap.");
check(sitemap.includes("/privacy/"), "Privacy page must be included in sitemap.");
check(sitemap.includes("listPublicProjects"), "Project sitemap entries must be driven by the project repository.");
check(sitemap.includes("listPublicReviews"), "Review sitemap visibility must be driven by verified review data.");
check(robots.includes('disallow: ["/admin/", "/api/"]'), "robots.ts must disallow admin and API crawling.");
check(packageJson.dependencies?.mysql2, "mysql2 dependency is required for owned persistence.");
check(schema.includes("CREATE TABLE IF NOT EXISTS intex_leads"), "Lead table is missing from database schema.");
check(schema.includes("CREATE TABLE IF NOT EXISTS intex_projects"), "Projects table is missing from database schema.");
check(schema.includes("CREATE TABLE IF NOT EXISTS intex_reviews"), "Reviews table is missing from database schema.");
check(schema.includes("permission_to_display"), "Review schema must track display permission.");
check(schema.includes("CREATE TABLE IF NOT EXISTS intex_content"), "CMS content table is missing from database schema.");
check(leadRoute.includes("storeLead"), "Lead endpoint must attempt owned database persistence.");
check(leadRoute.includes("lead_backend_not_configured"), "Lead endpoint must fail safely when no destination is configured.");
check(projectInput.includes("published_project_requires_images"), "Project publishing must require verified before/after media fields.");
check(reviewInput.includes("publish_requires_verification_and_permission"), "Review publishing must require verification and permission.");
check(reviewStore.includes("published = 1 AND verified = 1 AND permission_to_display = 1"), "Public reviews must enforce the three-part publication gate.");
check(homepage.includes("listPublicReviews"), "Homepage verified review section must use the review repository.");
check(homepage.includes('href="/restoration/"'), "Homepage Restoration navigation must point to the restoration hub.");
check(!homepage.includes("Photo-backed inspections"), "Do not publish photo-backed inspection claims without verified operational evidence.");
check(!homepage.includes("AggregateRating"), "Do not emit AggregateRating on the homepage without approved aggregate evidence.");

const forbiddenClaims = ["4.9-star", "4.9 star", "30-minute response", "lifetime guarantee", "since 2009"];
const publicFiles = ["app/page.tsx", "lib/site.ts", "lib/services.ts"];
for (const file of publicFiles) {
  const content = read(file).toLowerCase();
  for (const claim of forbiddenClaims) {
    check(!content.includes(claim.toLowerCase()), `Unverified claim "${claim}" found in ${file}.`);
  }
}

if (failures.length) {
  console.error("Platform validation failed:\n" + failures.map((item) => `- ${item}`).join("\n"));
  process.exit(1);
}

console.log(`Platform validation passed: ${redirectSources.length} legacy redirects, ${criticalRoutes.length} critical routes, restoration hub, CRM, projects, reviews, admin origin guards, and owned persistence checked.`);
