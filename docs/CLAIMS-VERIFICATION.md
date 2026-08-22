# Public Claims Verification

Last reviewed: 2026-08-22

Purpose: prevent the new platform from publishing marketing claims that have not been verified strongly enough for production use.

## Current status

| Claim | Status | Evidence / action |
| --- | --- | --- |
| Serving since 2009 | **Blocked** | BBB profile lists business started 2014 and incorporated 2014. Do not publish “since 2009”. |
| 24-hour emergency service | **Needs operational confirmation** | BBB profile describes 24-hour emergency service, but current internal staffing/coverage should be confirmed before prominent structured or contractual wording. |
| BBB A+ rating | **Externally supported, not yet enabled** | BBB profile currently displays A+ and explicitly states Intex is **not BBB Accredited**. If used, wording must never imply accreditation. |
| BBB Accredited | **False / prohibited** | BBB profile explicitly says Intex Restoration, Corp. is NOT a BBB Accredited Business. |
| Licensed & insured | **Blocked pending authoritative verification** | Third-party licensing data is inconsistent. BuildZoom displays a Chicago license number with an expiration date in 2026 but also marks it inactive/no active license. Verify directly with the licensing authority and internal insurance records before publishing. |
| 4.9-star rating | **Blocked** | Source/review count not verified for production display. |
| 30-minute response | **Blocked** | Operational/geographic conditions not verified. |
| Lifetime guarantee | **Blocked** | Written terms and exclusions not verified. |
| Free estimates | **Blocked pending business confirmation** | Confirm current policy and exclusions before publishing as a universal promise. |
| Phone `(773) 822-5892` | **Approved canonical contact** | Business-provided canonical contact. |
| Email `info@intexchicago.com` | **Approved canonical contact** | Business-provided canonical contact. |
| Address `6025 W Belmont Ave, Chicago, IL 60634` | **Externally corroborated, internal confirmation requested before schema** | Appears on current legacy site and BBB profile. Keep out of structured LocalBusiness schema until confirmed as the current public business address. |

## Rules

1. Do not add aggregate rating schema until the rating source, count, currency, and right to display are verified.
2. Do not add license numbers or `Licensed & Insured` to public pages until authoritative license status and current insurance are confirmed.
3. Do not imply BBB accreditation.
4. Do not resurrect legacy “Since 2009”, “30-minute response”, or “lifetime guarantee” copy merely because it existed in WordPress.
5. Any newly approved claim should be added here with its evidence before it is added to public templates or structured data.
