export type ServicePage = {
  slug: string;
  name: string;
  eyebrow: string;
  title: string;
  description: string;
  emergency: boolean;
  problems: string[];
  process: string[];
  related: string[];
};

export const servicePages: ServicePage[] = [
  {
    slug: "roofing-chicago",
    name: "Roofing",
    eyebrow: "Roofing built for Chicago weather",
    title: "Chicago Roofing, Roof Repair & Storm Damage Help",
    description: "Roof repair, replacement planning, flat-roof solutions and storm-damage support for homes and commercial properties across Chicagoland.",
    emergency: true,
    problems: ["Active roof leaks", "Wind or hail damage", "Missing or damaged roofing material", "Aging flat-roof systems", "Flashing and penetration failures", "Commercial roof concerns"],
    process: ["Tell us what is happening", "We assess the roof and immediate risk", "We explain repair or replacement options", "The work is completed and documented"],
    related: ["storm-damage-restoration-chicago", "water-damage-restoration-chicago", "insurance-claims"]
  },
  {
    slug: "water-damage-restoration-chicago",
    name: "Water Damage Restoration",
    eyebrow: "Fast action when water cannot wait",
    title: "Water Damage Restoration in Chicago",
    description: "Emergency water mitigation and property restoration for leaks, flooding, plumbing failures and related interior damage throughout Chicagoland.",
    emergency: true,
    problems: ["Burst or leaking pipes", "Basement or interior flooding", "Roof-related water intrusion", "Failed sump pumps", "Wet walls, ceilings or flooring", "Moisture after a storm"],
    process: ["Identify the source and immediate hazards", "Control and extract water", "Dry and monitor affected materials", "Plan and complete restoration"],
    related: ["mold-remediation-chicago", "roofing-chicago", "insurance-claims"]
  },
  {
    slug: "fire-damage-restoration-chicago",
    name: "Fire Damage Restoration",
    eyebrow: "A coordinated path after fire and smoke damage",
    title: "Fire & Smoke Damage Restoration in Chicago",
    description: "Cleanup and restoration planning for residential and commercial properties affected by fire, smoke, soot and related water damage.",
    emergency: true,
    problems: ["Fire-damaged rooms", "Smoke and soot residue", "Odor concerns", "Water used during suppression", "Damaged finishes and contents", "Commercial interruption"],
    process: ["Assess the affected areas", "Stabilize and protect the property", "Coordinate cleanup and restoration scope", "Restore and complete final walkthrough"],
    related: ["water-damage-restoration-chicago", "commercial-restoration-chicago", "insurance-claims"]
  },
  {
    slug: "storm-damage-restoration-chicago",
    name: "Storm Damage Restoration",
    eyebrow: "Wind, hail and severe-weather response",
    title: "Storm Damage Restoration in Chicago",
    description: "Assessment, temporary protection and restoration support after wind, hail and severe Chicagoland weather affects roofing or property exteriors.",
    emergency: true,
    problems: ["Wind damage", "Hail damage", "Roof leaks after storms", "Exterior damage", "Fallen debris impacts", "Emergency temporary protection"],
    process: ["Document visible damage", "Protect vulnerable areas", "Build the repair or restoration scope", "Complete and document the work"],
    related: ["roofing-chicago", "water-damage-restoration-chicago", "insurance-claims"]
  },
  {
    slug: "mold-remediation-chicago",
    name: "Mold Remediation",
    eyebrow: "Address moisture and affected materials together",
    title: "Mold Cleanup & Remediation in Chicago",
    description: "Mold cleanup and remediation planning focused on affected materials, moisture conditions and a clear path toward a healthier property.",
    emergency: false,
    problems: ["Visible mold growth", "Persistent musty odors", "Previous water damage", "Moisture behind finishes", "Basement or bathroom concerns", "Commercial indoor-environment concerns"],
    process: ["Review the moisture history", "Assess affected areas", "Define containment and cleanup scope", "Address restoration needs and prevention steps"],
    related: ["water-damage-restoration-chicago", "commercial-restoration-chicago"]
  },
  {
    slug: "commercial-restoration-chicago",
    name: "Commercial Restoration",
    eyebrow: "Restoration designed to keep business moving",
    title: "Commercial Restoration Services in Chicago",
    description: "Coordinated restoration and roofing support for property managers, owners and commercial facilities across Chicagoland.",
    emergency: true,
    problems: ["Commercial water losses", "Storm and roofing damage", "Fire and smoke damage", "Multi-area restoration", "Tenant or operational disruption", "Emergency property protection"],
    process: ["Establish the urgent priorities", "Document affected areas and scope", "Coordinate work around property operations", "Complete restoration with clear communication"],
    related: ["roofing-chicago", "water-damage-restoration-chicago", "fire-damage-restoration-chicago"]
  },
  {
    slug: "trauma-biohazard-cleaning-chicago",
    name: "Trauma & Biohazard Cleaning",
    eyebrow: "Discreet support for sensitive property situations",
    title: "Trauma & Biohazard Cleaning in Chicago",
    description: "Discreet property cleanup coordination for sensitive trauma and biohazard situations, with privacy and clear communication prioritized.",
    emergency: true,
    problems: ["Sensitive cleanup needs", "Affected interior surfaces", "Odor concerns", "Property access coordination", "Residential situations", "Commercial property situations"],
    process: ["Private initial conversation", "Assess access and affected areas", "Define the cleanup scope", "Complete cleanup and restoration coordination"],
    related: ["commercial-restoration-chicago", "insurance-claims"]
  },
  {
    slug: "insurance-claims",
    name: "Insurance Claims",
    eyebrow: "Documentation and restoration scope support",
    title: "Insurance Claim Support for Property Restoration",
    description: "A clearer restoration process when an insured property loss involves water, fire, storm or roofing damage.",
    emergency: false,
    problems: ["Documenting property damage", "Understanding restoration scope", "Coordinating inspections", "Organizing project documentation", "Separating emergency work from permanent repair", "Keeping project communication clear"],
    process: ["Document the condition", "Define the restoration scope", "Coordinate project information", "Complete work and retain records"],
    related: ["storm-damage-restoration-chicago", "water-damage-restoration-chicago", "fire-damage-restoration-chicago"]
  }
];

export const serviceBySlug = Object.fromEntries(servicePages.map((service) => [service.slug, service]));
