# Hostinger Deployment Runbook

Target platform: Hostinger Node.js Web App hosting with GitHub integration.

The application is a Next.js 16 / React 19 / TypeScript application and must be deployed as a Node.js web application, not as a static WordPress replacement and not through Hostinger Horizons.

## Preconditions

Do not map `intexchicago.com` to the new application until the production cutover issue is complete.

Required before production:

- CI typecheck, platform validation, and production build are green.
- `INTEX_LEADS_WEBHOOK_URL` points to the approved private lead destination.
- Lead success and failure paths are tested.
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

## Production environment variables

Configure these in Hostinger environment settings. Never commit values to GitHub.

```text
INTEX_LEADS_WEBHOOK_URL=<private production destination>
INTEX_LEADS_WEBHOOK_SECRET=<optional bearer secret>
INTEX_ADMIN_ENABLED=false
INTEX_ADMIN_PASSWORD=<strong unique password if enabled>
INTEX_ADMIN_SESSION_SECRET=<long random secret if enabled>
```

Admin should remain disabled until authentication has been tested in the deployed environment.

## Preview validation before domain mapping

Validate the Hostinger preview URL before touching DNS/domain routing:

- `/`
- `/roofing-chicago/`
- `/water-damage-restoration-chicago/`
- `/fire-damage-restoration-chicago/`
- `/storm-damage-restoration-chicago/`
- `/mold-remediation-chicago/`
- `/commercial-restoration-chicago/`
- `/trauma-biohazard-cleaning-chicago/`
- `/insurance-claims/`
- `/service-areas/chicago/`
- `/projects/`
- `/resources/`
- `/about/`
- `/contact/`
- `/privacy/`
- `/estimate/`
- `/api/health`

Also test every verified legacy redirect in `lib/legacy-redirects.ts`, including the `?page_id=12534` conditional redirect.

## Cutover

1. Freeze WordPress content changes during final validation.
2. Take final WordPress filesystem/database backup.
3. Confirm the Hostinger preview deployment is healthy.
4. Confirm lead delivery from the production app.
5. Confirm verified redirects on the preview/deployment host where possible.
6. Map `intexchicago.com` to the Node.js application.
7. Verify HTTPS and canonical host behavior.
8. Smoke-test phone, email, estimate flow, sitemap, robots, and redirects.
9. Submit/refresh sitemap in Search Console.
10. Monitor 404s, lead delivery, logs, indexing, and conversion paths.

## Important

Do not delete the WordPress backup during cutover. The old application is a rollback source only and must not be copied into the clean platform because the legacy homepage has shown injected spam content.
