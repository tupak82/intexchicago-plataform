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
- [x] Enforce review source verification + display permission before publication
- [x] Prevent homepage AggregateRating schema unless separately approved evidence is added later

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
- [x] Drive published project sitemap routes from the CMS repository
- [x] Add `/reviews/` to sitemap only when verified permitted reviews exist
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
- [x] Lead intake API with validation and dual database/webhook delivery strategy
- [x] Owned MySQL schema for leads, projects, reviews, and generic CMS content
- [x] Protected lead CRM inbox
- [x] Lead detail, workflow statuses, and private notes
- [x] Projects data model and public case-study architecture
- [x] Accessible before/after comparison component
- [x] Database-backed public project rendering
- [x] Visual project CMS: list, create, edit, draft/publish
- [x] Server-side guardrail requiring before/after images for published projects
- [x] Service areas architecture and Chicago page
- [x] Resource/article hub
- [x] Three initial educational SEO guides
- [x] Verification-first reviews/testimonials data model
- [x] Visual reviews CMS: list, create, edit, verify/permission/publish workflow
- [x] Database-backed public reviews page
- [x] Conditional verified-review section on homepage
- [x] Migration Control Center connected to Leads, Projects, and Reviews
- [x] Password-protected signed admin session flow
- [ ] Configure actual Hostinger MySQL credentials and apply `db/schema.sql`
- [ ] Migrate and verify real project photos/details before publishing case studies
- [ ] Add first verified review records only after source/display permission review
- [ ] Add direct media upload/storage workflow; project editor currently accepts verified image URLs
- [ ] Move remaining static resource/service content into visual CMS only if operationally useful

## Lead and privacy readiness

The estimate flow posts to `/api/leads`. Production delivery is intentionally blocked until an approved private persistence destination is actually reachable.

- [x] Create server-side lead payload validation
- [x] Add honeypot spam trap
- [x] Add payload-size protection
- [x] Add best-effort application rate limiting
- [x] Fail safely when no production lead backend is configured
- [x] Add owned MySQL persistence adapter
- [x] Keep optional authenticated webhook as notification/fallback
- [x] Accept success only if at least one approved destination actually succeeds
- [x] Add Privacy Policy and connect consent language from the estimate flow
- [x] Describe retention/deletion principles in the Privacy Policy
- [x] Build private admin lead workflow UI
- [ ] Create/configure Hostinger production database and dedicated least-privilege DB user
- [ ] Apply `db/schema.sql` to production database
- [ ] Test real lead storage/read/update end to end
- [ ] Add infrastructure/CDN-level rate limiting
- [ ] Approve concrete retention/deletion operating period
- [ ] Test email/SMS/CRM notifications if enabled
- [ ] Test emergency-call fallback on mobile

## Platform operations and security

- [x] Add `/api/health` readiness endpoint with live DB reachability status
- [x] Disable admin surface by default unless explicitly configured
- [x] Add admin password + signed HTTP-only session authentication
- [x] Add admin logout flow
- [x] Add same-origin checks on state-changing admin endpoints
- [x] Keep admin page `noindex` and disallow `/admin/` + `/api/` in robots
- [x] Remove `X-Powered-By`
- [x] Add baseline `nosniff`, frame, referrer, and permissions-policy headers
- [x] Add Hostinger Next.js + MySQL deployment runbook
- [x] Add production rollback procedure
- [ ] Final penetration/security review

## Quality gates before domain cutover

- [x] Add custom migration/SEO validator to repository
- [x] Enforce typecheck + migration validator + production build in CI workflow
- [x] Validator now protects redirects, CRM, DB schema, project CMS, review CMS, publication guardrails, and unverified-claim rules
- [ ] Typecheck passes — latest push run is not observable from the current connector
- [ ] Production build passes — latest push run is not observable from the current connector
- [ ] Automated CI passes on main
- [ ] Mobile QA on iPhone/Android sizes
- [ ] Desktop QA
- [ ] Keyboard accessibility QA
- [ ] Reduced-motion QA
- [ ] Core Web Vitals / Lighthouse review
- [ ] Forms and phone links tested against production database/backend
- [ ] Structured-data validation
- [x] Redirect validation rules added to CI
- [ ] Full redirect inventory/test set completed from legacy export/Search Console
- [ ] Security review
- [ ] Backup of existing WordPress files and database
- [x] Rollback plan documented

## Cutover rule

Do not point `intexchicago.com` at the new platform and do not delete WordPress until redirects, lead delivery, verified business content, analytics, QA, security review, backup, and rollback are complete.
