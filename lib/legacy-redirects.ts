export type LegacyRedirect = {
  source: string;
  destination: string;
  permanent: boolean;
  note?: string;
};

// Only add routes that have been verified from the live legacy site,
// WordPress export, sitemap, analytics, Search Console, or a confirmed index.
// These entries were verified from the live Intex WordPress navigation on
// 2026-08-22. Keep old URLs stable through permanent redirects after cutover.
export const legacyRedirects: LegacyRedirect[] = [
  {
    source: "/side-navigation/stormdamage/",
    destination: "/storm-damage-restoration-chicago/",
    permanent: true,
    note: "Verified legacy navigation route: Storm Damage",
  },
  {
    source: "/side-navigation/waterdamage/",
    destination: "/water-damage-restoration-chicago/",
    permanent: true,
    note: "Verified legacy navigation route: Water Damage",
  },
  {
    source: "/trauma-cleaning-biohazard-removal/",
    destination: "/trauma-biohazard-cleaning-chicago/",
    permanent: true,
    note: "Verified legacy navigation route: Trauma Cleaning",
  },
  {
    source: "/side-navigation/firedamage/",
    destination: "/fire-damage-restoration-chicago/",
    permanent: true,
    note: "Verified legacy navigation route: Fire Damage",
  },
  {
    source: "/mold-cleanup-remediation/",
    destination: "/mold-remediation-chicago/",
    permanent: true,
    note: "Verified legacy navigation route: Mold Cleanup & Remediation",
  },
  {
    source: "/side-navigation/insuranceclaim/",
    destination: "/insurance-claims/",
    permanent: true,
    note: "Verified legacy navigation route: Insurance Claim",
  },
  {
    source: "/side-navigation/commercialservices/",
    destination: "/commercial-restoration-chicago/",
    permanent: true,
    note: "Verified legacy navigation route: Commercial Services",
  },
  {
    source: "/side-navigation/roof-repair/",
    destination: "/roofing-chicago/",
    permanent: true,
    note: "Verified legacy navigation route: Roof Repair",
  },
  {
    source: "/why-us/",
    destination: "/about/",
    permanent: true,
    note: "Verified legacy About Intex Restoration route",
  },
];
