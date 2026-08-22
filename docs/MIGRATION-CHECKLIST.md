# Intex Chicago Migration Checklist

Status: **staging / migration in progress**

The legacy WordPress site remains the production source until every cutover item below is approved.

## Critical legacy finding

The current public homepage contains unrelated online-casino/spam paragraphs and outbound links after the legitimate Intex content. Treat the legacy WordPress installation as potentially compromised until the source of the injection is identified and removed. Do not copy legacy theme/plugin code, unknown scripts, widgets, or injected HTML into this repository.

## Content and claims verification

Before production, verify each claim against business records and current licenses/certifications. Do not publish structured data for unverified claims.

- [ ] 24/7 emergency-response wording
- [ ] “Serving Chicagoland since 2009”
- [ ] Licensed & insured status and current license details
- [ ] Lifetime guarantee wording and exact terms
- [ ] 30-minute response claim and geographic/operational conditions
- [ ] 4.9-star rating, source, review count, and permission to display
- [ ] Free-estimate wording and any exclusions
- [ ] Current business address, phone, email, hours, and service area

## URL and SEO migration

- [ ] Export all legitimate WordPress URLs
- [ ] Inventory pages currently indexed by Google
- [ ] Map each valuable legacy URL to the closest new canonical route
- [x] Create verified-only 301 redirect registry and Next.js redirect engine
- [ ] Populate redirect registry from verified legacy URLs
- [ ] Preserve or intentionally replace titles/descriptions that already rank
- [x] Add canonical metadata patterns to new service/location/project routes
- [x] Expand sitemap for services, published service areas, and published projects
- [x] Maintain robots rules and keep estimate/admin surfaces out of search
- [ ] Validate JSON-LD against current verified business facts
- [ ] Add Search Console and analytics configuration
- [ ] Submit new sitemap only after production cutover
- [ ] Monitor 404s, redirects, coverage, ranking and conversions after launch

## New platform routes — phase 1

- [x] Homepage
- [x] Roofing Chicago
- [x] Water Damage Restoration Chicago
- [x] Fire Damage Restoration Chicago
- [x] Storm Damage Restoration Chicago
- [x] Mold Remediation Chicago
- [x] Commercial Restoration Chicago
- [x] Trauma / Biohazard Cleaning Chicago
- [x] Insurance Claims
- [x] Step-by-step estimate/emergency request UX
- [x] Lead intake API with validation, honeypot, and configurable backend adapter
- [ ] Configure production lead persistence destination
- [x] Projects data model and public case-study architecture
- [x] Accessible before/after comparison component
- [ ] Migrate and verify real project photos/details before publishing case studies
- [x] Service areas architecture
- [x] Chicago service-area page
- [x] Gated migration Control Center scaffold
- [ ] Full authenticated CMS/editor roles
- [ ] Resource / article hub
- [ ] Reviews/testimonials data model

## Lead and privacy readiness

The estimate flow now posts to `/api/leads`. Production delivery is intentionally blocked until `INTEX_LEADS_WEBHOOK_URL` points to the approved private lead destination.

- [x] Create server-side lead payload validation
- [x] Add honeypot spam trap
- [x] Fail safely when no production lead backend is configured
- [x] Support bearer secret for backend delivery
- [ ] Configure production backend/data store or CRM workflow
- [ ] Add infrastructure-level rate limiting
- [ ] Define admin authentication and roles
- [ ] Store leads privately with least-privilege access
- [ ] Add privacy policy and final consent language approved for production
- [ ] Add retention/deletion policy
- [ ] Test email/SMS/CRM notifications if enabled
- [ ] Test emergency-call fallback on mobile

## Platform operations and security

- [x] Add `/api/health` readiness endpoint
- [x] Disable admin surface by default unless `INTEX_ADMIN_ENABLED=true`
- [x] Keep admin page `noindex`
- [x] Remove `X-Powered-By`
- [x] Add baseline `nosniff`, frame, referrer, and permissions-policy headers
- [ ] Add authenticated admin before enabling it in production
- [ ] Final penetration/security review

## Quality gates before domain cutover

- [ ] Typecheck passes — automated workflow exists; latest run not yet observable from the current connector
- [ ] Production build passes — automated workflow exists; latest run not yet observable from the current connector
- [ ] Automated CI passes on main
- [ ] Mobile QA on iPhone/Android sizes
- [ ] Desktop QA
- [ ] Keyboard accessibility QA
- [ ] Reduced-motion QA
- [ ] Core Web Vitals / Lighthouse review
- [ ] Forms and phone links tested against production backend
- [ ] Structured-data validation
- [ ] Redirect test suite populated from legacy inventory
- [ ] Security review
- [ ] Backup of existing WordPress files and database
- [ ] Rollback plan documented

## Cutover rule

Do not point `intexchicago.com` at the new platform and do not delete WordPress until the redirects, content, lead handling, analytics, SEO metadata, security review and rollback plan are complete.
