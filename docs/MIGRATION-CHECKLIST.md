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
- [ ] Current business address, hours, and complete service area
- [x] Canonical phone and email centralized in platform config

## URL and SEO migration

- [ ] Export all legitimate WordPress URLs
- [x] Begin indexed/live legacy URL inventory
- [x] Map verified legacy navigation routes to closest new canonical routes
- [x] Create verified-only 301 redirect registry and Next.js redirect engine
- [x] Add query-string redirect support for confirmed indexed `page_id` URLs
- [x] Populate first verified redirect set
- [x] Preserve `/contact/` as a stable canonical route
- [x] Replace `/why-us/` with `/about/` and 301 the legacy URL
- [x] Add canonical metadata patterns to new service/location/project/resource routes
- [x] Expand sitemap for services, published service areas, projects, resources, About, and Contact
- [x] Keep admin/API surfaces out of crawl
- [ ] Preserve or intentionally replace additional titles/descriptions that already rank
- [ ] Validate JSON-LD against current verified business facts
- [ ] Add Search Console and analytics configuration
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

The estimate flow posts to `/api/leads`. Production delivery is intentionally blocked until `INTEX_LEADS_WEBHOOK_URL` points to the approved private lead destination.

- [x] Create server-side lead payload validation
- [x] Add honeypot spam trap
- [x] Add payload-size protection
- [x] Add best-effort application rate limiting
- [x] Fail safely when no production lead backend is configured
- [x] Support bearer secret for backend delivery
- [ ] Configure production backend/data store or CRM workflow
- [ ] Add infrastructure/CDN-level rate limiting
- [ ] Store leads privately with least-privilege access
- [ ] Add privacy policy and final consent language approved for production
- [ ] Add retention/deletion policy
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
- [ ] Final penetration/security review

## Quality gates before domain cutover

- [ ] Typecheck passes — automated workflow exists; latest push run is not observable from the current connector
- [ ] Production build passes — automated workflow exists; latest push run is not observable from the current connector
- [ ] Automated CI passes on main
- [ ] Mobile QA on iPhone/Android sizes
- [ ] Desktop QA
- [ ] Keyboard accessibility QA
- [ ] Reduced-motion QA
- [ ] Core Web Vitals / Lighthouse review
- [ ] Forms and phone links tested against production backend
- [ ] Structured-data validation
- [ ] Redirect test suite completed from legacy inventory
- [ ] Security review
- [ ] Backup of existing WordPress files and database
- [ ] Rollback plan documented

## Cutover rule

Do not point `intexchicago.com` at the new platform and do not delete WordPress until redirects, lead delivery, verified business content, analytics, QA, security review, backup, and rollback are complete.
