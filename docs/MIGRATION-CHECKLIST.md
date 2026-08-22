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
- [ ] Create 301 redirect table
- [ ] Preserve or intentionally replace titles/descriptions that already rank
- [ ] Review heading structure and internal links
- [ ] Validate canonical tags
- [ ] Validate sitemap and robots rules
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
- [ ] Persist leads to production backend
- [ ] Projects / before-after case studies
- [ ] Service areas architecture
- [ ] Resource / article hub
- [ ] Reviews/testimonials data model
- [ ] Admin/CMS

## Lead and privacy readiness

The current estimate flow is UX-only and intentionally does **not** persist customer data yet.

- [ ] Choose and configure production backend/data store
- [ ] Define admin authentication and roles
- [ ] Store leads privately with least-privilege access
- [ ] Add spam/rate-limit protection
- [ ] Add privacy policy and consent language approved for production
- [ ] Add retention/deletion policy
- [ ] Test email/SMS/CRM notifications if later enabled
- [ ] Test emergency-call fallback on mobile

## Quality gates before domain cutover

- [ ] Typecheck passes
- [ ] Production build passes
- [ ] Automated CI passes on main
- [ ] Mobile QA on iPhone/Android sizes
- [ ] Desktop QA
- [ ] Keyboard accessibility QA
- [ ] Reduced-motion QA
- [ ] Core Web Vitals / Lighthouse review
- [ ] Forms and phone links tested
- [ ] Structured-data validation
- [ ] Redirect test suite
- [ ] Security review
- [ ] Backup of existing WordPress files and database
- [ ] Rollback plan documented

## Cutover rule

Do not point `intexchicago.com` at the new platform and do not delete WordPress until the redirects, content, lead handling, analytics, SEO metadata, security review and rollback plan are complete.
