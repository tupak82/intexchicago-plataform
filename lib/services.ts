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
    title: "Chicago Roofing Contractor for Repair, Replacement & Storm Damage",
    description: "Roof repair, roof replacement, flat roofing, commercial roofing and storm-damage support for homes and properties across Chicago and Chicagoland.",
    emergency: true,
    problems: ["Active roof leaks", "Wind or hail damage", "Missing or damaged roofing material", "Aging flat-roof systems", "Flashing and penetration failures", "Commercial roof concerns"],
    process: ["Tell us what is happening", "We assess the roof and immediate risk", "We explain repair or replacement options", "The work is completed and documented"],
    related: ["roof-repair-chicago", "roof-replacement-chicago", "flat-roofing-chicago", "commercial-roofing-chicago"]
  },
  {
    slug: "roof-repair-chicago",
    name: "Roof Repair",
    eyebrow: "Targeted roofing repairs for Chicago properties",
    title: "Roof Repair in Chicago",
    description: "Chicago roof repair for leaks, flashing failures, damaged shingles, punctures, storm damage and other roofing problems affecting residential and commercial properties.",
    emergency: true,
    problems: ["Roof leaks and water intrusion", "Missing, lifted or damaged shingles", "Flashing and penetration failures", "Storm and wind damage", "Localized flat-roof damage", "Roof problems around vents, chimneys or edges"],
    process: ["Inspect the problem area and surrounding roof", "Identify the likely source and extent of damage", "Explain the repair scope and alternatives", "Complete the repair and verify vulnerable areas"],
    related: ["roofing-chicago", "roof-replacement-chicago", "storm-damage-restoration-chicago", "flat-roofing-chicago"]
  },
  {
    slug: "roof-replacement-chicago",
    name: "Roof Replacement",
    eyebrow: "A new roof planned for Chicago conditions",
    title: "Roof Replacement in Chicago",
    description: "Roof replacement planning and installation for aging, failing or heavily damaged roofing systems on Chicago homes, multifamily buildings and commercial properties.",
    emergency: false,
    problems: ["Roof systems near the end of service life", "Repeated leaks or recurring repairs", "Widespread shingle or membrane deterioration", "Major storm or hail damage", "Decking or substrate concerns", "Renovation or property improvement projects"],
    process: ["Evaluate the existing roof system", "Review replacement scope and material options", "Plan tear-off, protection and installation", "Complete the new roof and final walkthrough"],
    related: ["roofing-chicago", "roof-repair-chicago", "flat-roofing-chicago", "commercial-roofing-chicago"]
  },
  {
    slug: "flat-roofing-chicago",
    name: "Flat Roofing",
    eyebrow: "Low-slope roofing for Chicago buildings",
    title: "Flat Roofing in Chicago",
    description: "Flat and low-slope roofing repair, replacement and assessment for Chicago homes, multifamily buildings, commercial properties and other urban roof systems.",
    emergency: true,
    problems: ["Ponding or slow-draining water", "Membrane punctures or open seams", "Flashing failures", "Leaks around roof penetrations", "Aging or deteriorated low-slope systems", "Commercial and multifamily roof concerns"],
    process: ["Inspect drainage, membrane and penetrations", "Locate visible failure points and moisture risks", "Recommend repair or replacement strategy", "Complete roofing work and review drainage performance"],
    related: ["roofing-chicago", "roof-repair-chicago", "roof-replacement-chicago", "commercial-roofing-chicago"]
  },
  {
    slug: "commercial-roofing-chicago",
    name: "Commercial Roofing",
    eyebrow: "Roofing for Chicago businesses and property owners",
    title: "Commercial Roofing in Chicago",
    description: "Commercial roof repair, replacement, inspection and storm-damage support for Chicago businesses, facilities, property managers and multi-unit properties.",
    emergency: true,
    problems: ["Leaks affecting tenants or operations", "Flat and low-slope roof failures", "Storm, wind or hail damage", "Aging commercial roof systems", "Drainage and ponding concerns", "Planned roof replacement projects"],
    process: ["Assess roof condition and operational priorities", "Document visible conditions and scope", "Plan work around building access and operations", "Complete and document the roofing project"],
    related: ["roofing-chicago", "flat-roofing-chicago", "roof-repair-chicago", "storm-damage-restoration-chicago"]
  },
  {
    slug: "roof-inspection-chicago",
    name: "Roof Inspection",
    eyebrow: "Know what your roof needs before you spend",
    title: "Roof Inspection in Chicago",
    description: "Roof inspections for Chicago homeowners, property owners and commercial buildings to identify visible damage, maintenance concerns and next-step roofing needs.",
    emergency: false,
    problems: ["Suspected storm damage", "Leaks with an unclear source", "Aging roof systems", "Pre-repair or replacement planning", "Property maintenance reviews", "Visible exterior roofing concerns"],
    process: ["Review the concern and property context", "Inspect visible roof conditions and vulnerable areas", "Document findings and priorities", "Explain whether repair, monitoring or replacement makes sense"],
    related: ["roof-repair-chicago", "roof-replacement-chicago", "flat-roofing-chicago", "commercial-roofing-chicago"]
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
    related: ["mold-remediation-chicago", "roof-repair-chicago", "insurance-claims"]
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
    title: "Storm Damage Roofing & Restoration in Chicago",
    description: "Roof inspection, temporary protection and restoration support after wind, hail and severe Chicagoland weather affects roofing or property exteriors.",
    emergency: true,
    problems: ["Wind damage", "Hail damage", "Roof leaks after storms", "Exterior damage", "Fallen debris impacts", "Emergency temporary protection"],
    process: ["Document visible damage", "Protect vulnerable areas", "Build the repair or restoration scope", "Complete and document the work"],
    related: ["roof-repair-chicago", "roof-replacement-chicago", "roof-inspection-chicago", "insurance-claims"]
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
    related: ["commercial-roofing-chicago", "water-damage-restoration-chicago", "fire-damage-restoration-chicago"]
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
    related: ["storm-damage-restoration-chicago", "roof-inspection-chicago", "roof-repair-chicago"]
  }
];

export const serviceBySlug = Object.fromEntries(servicePages.map((service) => [service.slug, service]));
