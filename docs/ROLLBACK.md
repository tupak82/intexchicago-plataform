# Production Rollback Procedure

This procedure exists so the Intex Chicago cutover can be reversed quickly without improvising under pressure.

## Rollback triggers

Rollback should be considered if any of the following occurs immediately after launch:

- The production application does not load reliably.
- Lead submissions fail or are not delivered to the approved private destination.
- Critical service pages return errors.
- Verified legacy URLs do not redirect correctly and materially affect traffic.
- DNS/SSL behavior causes customer-facing outages.
- A security problem exposes private customer or admin data.

## Required pre-cutover artifacts

Before the domain is switched, retain:

- A full WordPress filesystem backup.
- A full WordPress database backup.
- Current DNS records and previous values.
- The last known production WordPress document root / hosting target.
- The exact Git commit deployed to Hostinger.
- Production environment-variable inventory, without putting secret values in Git.

## Rollback steps

1. Stop further production changes.
2. Record the failure symptoms and the current deployed commit.
3. If the failure is isolated to the new application and the legacy host remains available, restore the previous domain/DNS target or Hostinger site mapping.
4. Confirm `https://intexchicago.com/` resolves to the intended rollback target.
5. Confirm HTTPS is valid.
6. Test phone/contact paths and several high-value legacy pages.
7. Keep the compromised/injected WordPress concern in mind: a rollback restores service continuity, not trust in the legacy codebase.
8. Do not copy files from the old WordPress installation into the Next.js repository as a fix.
9. Diagnose and patch the new platform in GitHub, run CI, redeploy to preview, and repeat QA before attempting cutover again.

## Data handling during rollback

If customer leads were accepted by the new platform before rollback, preserve those records in the approved private destination. Do not assume that reverting the website also reverts or deletes submitted customer information.

## SEO handling

A short rollback should preserve the old site's URL behavior while the new application is repaired. Do not make ad-hoc redirect changes during an outage unless a specific redirect is causing the incident.

## Completion criteria

The rollback is complete only when:

- The public domain is serving a stable site.
- Phone/contact paths work.
- The incident and deployed commit are recorded.
- No customer lead is knowingly lost.
- A new deployment is not attempted until the failed gate is corrected and revalidated.
