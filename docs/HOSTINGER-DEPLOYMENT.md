# Hostinger Deployment Runbook

Target platform: Hostinger Node.js Web App hosting with GitHub integration plus an owned MySQL database.

The application is a Next.js 16 / React 19 / TypeScript application and must be deployed as a Node.js web application, not as a static WordPress replacement and not through Hostinger Horizons.

## Preconditions

Do not map `intexchicago.com` to the new application until the production cutover issue is complete.

Required before production:

- CI typecheck, platform validation, and production build are green.
- Hostinger MySQL is created and `db/schema.sql` has been applied.
- Database credentials are configured as private environment variables.
- `npm run preflight:preview` passes in the deployed environment.
- Lead success and failure paths are tested end to end.
- Admin login, lead CRM, project CMS, and review CMS are tested against the production database.
- `INTEX_ADMIN_PASSWORD` and `INTEX_ADMIN_SESSION_SECRET` are strong production secrets if admin is enabled.
- Legacy 301 redirects are verified.
- Current WordPress files and database are backed up.
- Analytics/Search Console configuration is ready.
- Rollback procedure is tested.

## Hostinger application setup

1. In hPanel, create a Node.js Web App / Deploy Web App site.
2. Connect GitHub and select `tupak82/intexchicago-plataform`.
3. Deploy branch: `main` only after the production gates are approved.
4. Framework: Next.js (allow Hostinger auto-detection).
5. Node.js: use a current supported LTS/runtime compatible with the repository CI; Node 22 is the CI baseline.
6. Install command: `npm install`.
7. Build command: `npm run build`.
8. Start command: `npm start`.
9. Do not configure a static output directory; this application uses Next.js server/API functionality.

## Owned MySQL setup

Create a private MySQL database in Hostinger and apply `db/schema.sql`. The schema creates:

- `intex_leads` — private customer requests and workflow status.
- `intex_projects` — project / before-after records and draft/publish state.
- `intex_reviews` — review source, verification, display permission, and publish state.
- `intex_content` — generic CMS content collection storage.

Use a dedicated database user with only the permissions required by this application. Do not reuse WordPress database credentials.

## Production environment variables

Configure these in Hostinger environment settings. Never commit values to GitHub.

```text
INTEX_DB_HOST=<Hostinger MySQL host>
INTEX_DB_PORT=3306
INTEX_DB_USER=<dedicated Intex platform DB user>
INTEX_DB_PASSWORD=<strong database password>
INTEX_DB_NAME=<Intex platform database>

# Optional notification / CRM delivery. MySQL is the owned persistence layer.
INTEX_LEADS_WEBHOOK_URL=<optional private notification destination>
INTEX_LEADS_WEBHOOK_SECRET=<optional bearer secret>

INTEX_ADMIN_ENABLED=false
INTEX_ADMIN_PASSWORD=<strong unique password if enabled>
INTEX_ADMIN_SESSION_SECRET=<long random secret if enabled>

NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=<approved Search Console token when ready>
NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=<approved GA measurement ID when ready>
NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID=<approved GTM container ID when ready>
```

Admin should remain disabled until authentication and database access have been tested in the deployed environment.

## Preview preflight

After the environment variables are configured and `db/schema.sql` has been applied, run:

```bash
npm run preflight:preview
```

The command is intentionally strict. It fails when neither MySQL nor the approved lead webhook is configured, when MySQL cannot be reached, when required tables are missing, or when admin is enabled without its required secrets. Analytics and Search Console variables are reported but remain optional for preview.

A passing preflight confirms environment readiness; it does not replace the HTTP smoke test after the app is running.

## Lead acceptance rule

`/api/leads` accepts a request only when at least one approved destination actually succeeds:

1. MySQL is attempted when configured.
2. The optional webhook is attempted for notification/fallback.
3. If MySQL stores the request, the customer can receive a success response even if the notification webhook is temporarily unavailable.
4. If MySQL fails but the approved webhook succeeds, the request can still be accepted through that fallback.
5. If neither destination succeeds, the form receives an error and tells the customer to call instead of displaying a false confirmation.

## CMS publication rules

- Projects may remain drafts with incomplete media, but publishing is rejected server-side unless before and after image URLs are present and valid.
- Reviews may remain drafts or verified internal records, but public publishing is rejected unless both source verification and permission to display are explicitly enabled.
- The public Reviews page is `noindex` while it has no publishable reviews, and the sitemap omits it until eligible review records exist.
- The homepage only renders reviews returned by the same verified public repository. It never fabricates aggregate ratings.

## Preview validation before domain mapping

Validate the Hostinger preview URL before touching DNS/domain routing. First confirm `/api/health` returns HTTP 200 with `status: "healthy"`; a 503 `degraded` response means the web app is running but the lead backend is not ready.

Then validate:

- `/`
- `/roofing-chicago/`
- `/roof-repair-chicago/`
- `/roof-replacement-chicago/`
- `/flat-roofing-chicago/`
- `/commercial-roofing-chicago/`
- `/roof-inspection-chicago/`
- `/water-damage-restoration-chicago/`
- `/fire-damage-restoration-chicago/`
- `/storm-damage-restoration-chicago/`
- `/mold-remediation-chicago/`
- `/commercial-restoration-chicago/`
- `/trauma-biohazard-cleaning-chicago/`
- `/insurance-claims/`
- `/service-areas/`
- `/service-areas/chicago/`
- `/projects/`
- `/resources/`
- `/reviews/` (should be noindex/empty until a verified permitted review exists)
- `/about/`
- `/contact/`
- `/privacy/`
- `/estimate/`
- `/sitemap.xml`
- `/robots.txt`
- `/api/health`

Run the automated HTTP pass against the preview hostname:

```bash
INTEX_SMOKE_BASE_URL=https://<hostinger-preview-host> npm run smoke:production
```

When admin is enabled and authenticated, also validate:

- `/admin/`
- `/admin/leads/`
- a real `/admin/leads/{id}/` record after a test submission
- lead status and internal note updates
- `/admin/projects/` create/edit/draft/publish workflow
- a published project at `/projects/{slug}/`
- `/admin/reviews/` create/edit/verification/permission workflow
- confirm an unverified review cannot be published
- confirm an eligible published review appears at `/reviews/` and conditionally on the homepage

Also test every verified legacy redirect in `lib/legacy-redirects.ts`, including the `?page_id=12534` conditional redirect.

## Cutover

1. Freeze WordPress content changes during final validation.
2. Take final WordPress filesystem/database backup.
3. Confirm `npm run preflight:preview` passes against the configured environment.
4. Confirm the Hostinger preview deployment is healthy at `/api/health`.
5. Run `INTEX_SMOKE_BASE_URL=https://<hostinger-preview-host> npm run smoke:production`.
6. Submit a test lead and confirm it appears in MySQL and `/admin/leads/`.
7. Confirm lead failure behavior by temporarily testing an unavailable destination in a controlled preview environment.
8. Create one draft project, confirm draft is not public, then validate publication with approved test media.
9. Create one review test record and confirm the verification/permission publication gate.
10. Confirm verified redirects on the preview/deployment host where possible.
11. Map `intexchicago.com` to the Node.js application.
12. Verify HTTPS and canonical host behavior.
13. Smoke-test phone, email, estimate flow, sitemap, robots, admin login, CMS, and redirects.
14. Submit/refresh sitemap in Search Console.
15. Monitor 404s, lead delivery, logs, indexing, and conversion paths.

## Important

Do not delete the WordPress backup during cutover. The old application is a rollback source only and must not be copied into the clean platform because the legacy homepage has shown injected spam content.
