# Intex Chicago Legacy URL Inventory

Last verified: 2026-08-22

This inventory records WordPress routes observed directly from the live `intexchicago.com` navigation or confirmed in the public search index. It is a migration source of truth, not a guessed URL list.

| Legacy WordPress route | New platform route | Migration action |
| --- | --- | --- |
| `/side-navigation/stormdamage/` | `/storm-damage-restoration-chicago/` | 301 |
| `/side-navigation/waterdamage/` | `/water-damage-restoration-chicago/` | 301 |
| `/trauma-cleaning-biohazard-removal/` | `/trauma-biohazard-cleaning-chicago/` | 301 |
| `/?page_id=12534` | `/trauma-biohazard-cleaning-chicago/` | 301 with query match |
| `/side-navigation/firedamage/` | `/fire-damage-restoration-chicago/` | 301 |
| `/mold-cleanup-remediation/` | `/mold-remediation-chicago/` | 301 |
| `/side-navigation/insuranceclaim/` | `/insurance-claims/` | 301 |
| `/side-navigation/commercialservices/` | `/commercial-restoration-chicago/` | 301 |
| `/side-navigation/roof-repair/` | `/roofing-chicago/` | 301 |
| `/why-us/` | `/about/` | 301 |
| `/contact/` | `/contact/` | Preserve canonical path |
| `/` | `/` | Preserve canonical path |

## Important migration notes

- Do not redirect every unknown WordPress URL to the homepage. Unknown valuable URLs must be mapped to the closest relevant replacement.
- Preserve `/contact/` because it exists on the legacy site and now has a clean replacement at the same path.
- Continue expanding this inventory from the WordPress export, Search Console, analytics, server logs, and any indexed URLs found before cutover.
- The legacy homepage currently contains unrelated spam/casino text after legitimate Intex content. Do not migrate that injected content or any unknown scripts that produced it.
