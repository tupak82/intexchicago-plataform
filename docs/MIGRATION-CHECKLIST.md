# Intex Chicago Migration Checklist

Status: **staging / migration in progress**

The legacy WordPress site remains the production source until every cutover item below is approved.

## Critical legacy finding

The current public homepage contains unrelated online-casino/spam paragraphs and outbound links after the legitimate Intex content. Treat the legacy WordPress installation as potentially compromised until the source of the injection is identified and removed. Do not copy legacy theme/plugin code, unknown scripts, widgets, or injected HTML into this repository.

## Content and claims verification

Before production, verify each claim against business records and current licenses/certifications. Do not publish structured data for unverified claims.

- [x] Block legacy “Serving since 2009” wording; public BBB data lists business start/incorporation in 2014
- [ ] Confirm current 24-hour emergency-response operation internally before enabling prominent claim/schema wording
- [ ] Licensed & insured status and current license details — blocked pending authoritative verification
- [ ] Lifetime guarantee wording and exact terms
- [ ] 30-minute response claim and geographic/operational conditions
- [ ] 4.9-star rating, source, review count, and permission to display
- [ ] Free-estimate wording and any exclusions
- [ ] Current business address, hours, and complete service area
- [x] Canonical phone and email centralized in platform config
- [x] Document verification status in `docs/CLAIMS-VERIFICATION.md`
- [x] Prevent BBB accreditation wording; public BBB profile states Intex is not accredited

## URL and SEO migration

- [ ] Export all legitimate WordPress URLs
- [x] Begin indexed/live legacy URL inventory
- [x] Map verified legacy navigation routes to closest new canonical routes
- [x] Create verified-only 301 redirect registry and Next.js redirect engine
- [x] Add query-string redirect support for confirmed indexed `page_id` URLs
- [x] Populate first verified redirect set
- [x] Preserve `/contact/` as a stable canonical route
- [x] Replace `/why-us/` with `/about/` and 301 the legacy URL
- [x] Add canonical metadata patterns to new service/location/project/resource/privacy routes
- [x] Expand sitemap for services, published service areas, projects, resources, About, Contact, and Privacy
- [x] Keep admin/API surfaces out of crawl
- [x] Add useful custom 404 recovery page
- [x] Add environment-driven Search Console verification hook
- [x] Add environment-driven Google Analytics hook without hardcoding IDs
- [ ] Configure approved production Search Console and analytics IDs
- [ ] Preserve or intentionally replace additional titles/descriptions that already rank
- [ ] Validate JSON-LD against current verified business facts
- [ ] Submit new sitemap only after production cutover
- [ ] Monitor 404s, redirects, coverage, ranking and conversions after launch

See `docs/LEGACY-URL-INVENTORY.md` for verified mappings.

## New platform routes and systems

- [x] Homepage
- [x] Roofing Chicago
- [x] Water Damage Restoration Chicago
- [x] Fire Damage Restoration Chicago
- [x] Storm Damage Restoration Chicago
- [x] Mold Remediation Chicago
- [x] Commercial Restoration Chicago
- [x] Trauma / Biohazard Cleaning Chicago
- [x] Insurance Claims
- [x] About replacement
- [x] Contact replacement
- [x] Privacy Policy
- [x] Step-by-step estimate/emergency request UX
- [x] Lead intake API with validation and configurable backend adapter
- [x] Projects data model and public case-study architecture
- [x] Accessible before/after comparison component
- [x] Service areas architecture and Chicago page
- [x] Resource/article hub
- [x] Three initial educational SEO guides
- [x] Verification-first reviews/testimonials data model
- [x] CMS collection registry
- [x] Migration Control Center
- [x] Password-protected signed admin session flow
- [ ] Configure production lead persistence destination
- [ ] Migrate and verify real project photos/details before publishing case studies
- [ ] Build full visual CRUD editing for CMS collections

## Lead and privacy readiness

The estimate flow posts to `/api/leads`. Production delivery is intentionally blocked until an approved private persistence destination is configured.

- [x] Create server-side lead payload validation
- [x] Add honeypot spam trap
- [x] Add payload-size protection
- [x] Add best-effort application rate limiting
- [x] Fail safely when no production lead backend is configured
- [x] Support bearer secret for webhook delivery
- [x] Add Privacy Policy and connect consent language from the estimate flow
- [x] Describe retention/deletion principles in the Privacy Policy
- [ ] Configure production database/CRM destination
- [ ] Add infrastructure/CDN-level rate limiting
- [ ] Store leads privately with least-privilege access
- [ ] Approve concrete retention/deletion operating period
- [ ] Test email/SMS/CRM notifications if enabled
- [ ] Test emergency-call fallback on mobile

## Platform operations and security

- [x] Add `/api/health` readiness endpoint
- [x] Disable admin surface by default unless explicitly configured
- [x] Add admin password + signed HTTP-only session authentication
- [x] Add admin logout flow
- [x] Keep admin page `noindex` and disallow `/admin/` + `/api/` in robots
- [x] Remove `X-Powered-By`
- [x] Add baseline `nosniff`, frame, referrer, and permissions-policy headers
- [x] Add Hostinger Next.js deployment runbook
- [x] Add production rollback procedure
- [ ] Final penetration/security review

## Quality gates before domain cutover

- [x] Add custom migration/SEO validator to repository
- [x] Enforce typecheck + migration validator + production build in CI workflow
- [ ] Typecheck passes — latest push run is not observable from the current connector
- [ ] Production build passes — latest push run is not observable from the current connector
- [ ] Automated CI passes on main
- [ ] Mobile QA on iPhone/Android sizes
- [ ] Desktop QA
- [ ] Keyboard accessibility QA
- [ ] Reduced-motion QA
- [ ] Core Web Vitals / Lighthouse review
- [ ] Forms and phone links tested against production backend
- [ ] Structured-data validation
- [x] Redirect validation rules added to CI
- [ ] Full redirect inventory/test set completed from legacy export/Search Console
- [ ] Security review
- [ ] Backup of existing WordPress files and database
- [x] Rollback plan documented

## Cutover rule

Do not point `intexchicago.com` at the new platform and do not delete WordPress until redirects, lead delivery, verified business content, analytics, QA, security review, backup, and rollback are complete.
