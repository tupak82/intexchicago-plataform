export type ServiceArea = {
  slug: string;
  name: string;
  title: string;
  description: string;
  intro: string;
  indexable: boolean;
  highlights: string[];
  propertyFocus: string;
  roofingContext: string;
};

export const serviceAreas: ServiceArea[] = [
  {
    slug: "chicago",
    name: "Chicago",
    title: "Chicago Roofing Contractor | Roof Repair & Replacement",
    description: "Intex Chicago provides roof repair, roof replacement, flat roofing, commercial roofing and storm-damage support across Chicago.",
    intro: "Chicago properties range from single-family homes to multifamily buildings, storefronts and large commercial roofs. Intex focuses on practical roofing solutions for leaks, aging roof systems, storm damage and planned replacements throughout the city.",
    indexable: true,
    propertyFocus: "Homes, multifamily buildings, flat-roof properties and commercial facilities",
    roofingContext: "Chicago roofing has to manage wind, hail, heavy rain, snow, ice and repeated freeze-thaw cycles. Flat and low-slope systems are also common across many city properties, making drainage, flashing and membrane condition especially important.",
    highlights: ["Roof repair and leak response", "Roof replacement planning", "Flat and low-slope roofing", "Commercial and multifamily roofing", "Storm and hail damage inspections", "Roof condition assessments"],
  },
  {
    slug: "evanston",
    name: "Evanston",
    title: "Roofing Contractor in Evanston, IL | Intex Chicago",
    description: "Roof repair, replacement, flat roofing and storm-damage roofing services for homes and properties in Evanston, Illinois.",
    intro: "Intex serves Evanston homeowners, property owners and managers with roofing support for leaks, aging systems, storm damage and replacement projects. The goal is a clear assessment first, then the right repair or replacement scope for the property.",
    indexable: true,
    propertyFocus: "Single-family homes, multifamily properties and mixed residential-commercial buildings",
    roofingContext: "Evanston properties can include steep-slope residential roofs alongside flat and low-slope systems. Seasonal wind, rain, snow and freeze-thaw conditions make flashing, drainage and aging materials important parts of a roof assessment.",
    highlights: ["Residential roof repair", "Roof replacement", "Flat-roof assessment and repair", "Storm-damage inspections", "Flashing and leak diagnosis", "Multifamily roofing support"],
  },
  {
    slug: "skokie",
    name: "Skokie",
    title: "Roofing Contractor in Skokie, IL | Roof Repair & Replacement",
    description: "Intex provides roof repair, roof replacement, storm-damage inspections and commercial roofing support in Skokie, Illinois.",
    intro: "For Skokie properties, Intex provides roofing assessments and project support for active leaks, worn roofing materials, storm-related concerns and full replacement planning.",
    indexable: true,
    propertyFocus: "Residential homes, multifamily properties and commercial buildings",
    roofingContext: "Skokie roofs face the same demanding northern Illinois weather cycle as Chicago: wind, storms, winter snow and temperature swings. Preventing water entry often comes down to details such as flashing, penetrations, roof edges and drainage.",
    highlights: ["Leak and roof repair", "Roof replacement", "Storm and hail damage assessment", "Commercial roofing", "Flat and low-slope roofing", "Roof inspections"],
  },
  {
    slug: "niles",
    name: "Niles",
    title: "Roofing Contractor in Niles, IL | Intex Chicago Roofing",
    description: "Roof repair, replacement, commercial roofing and storm-damage support for residential and commercial properties in Niles, Illinois.",
    intro: "Intex helps Niles property owners understand whether a roofing problem calls for a focused repair, continued monitoring or a larger replacement project.",
    indexable: true,
    propertyFocus: "Homes, retail properties, multifamily buildings and commercial facilities",
    roofingContext: "Wind-driven rain, snow, ice and seasonal temperature changes can expose weak points around flashing, edges, penetrations and aging roofing materials. A useful inspection looks at the roof as a complete water-management system.",
    highlights: ["Roof leak repair", "Roof replacement planning", "Commercial roof service", "Storm-damage roofing", "Flat-roof inspections", "Preventive roof assessments"],
  },
  {
    slug: "des-plaines",
    name: "Des Plaines",
    title: "Roofing Contractor in Des Plaines, IL | Intex Chicago",
    description: "Roof repair, roof replacement, commercial roofing and storm-damage inspections for properties in Des Plaines, Illinois.",
    intro: "Intex provides Des Plaines homeowners and commercial property owners with clear roofing assessments, repair options and replacement planning built around the actual condition of the roof.",
    indexable: true,
    propertyFocus: "Residential homes, commercial properties and low-slope roof systems",
    roofingContext: "Northern Illinois storms and seasonal weather can create both obvious damage and smaller failure points that become leaks later. Roof edges, flashing, penetrations and drainage deserve close attention after severe weather or repeated repairs.",
    highlights: ["Residential roof repair", "Roof replacement", "Commercial roofing", "Storm and wind damage", "Low-slope roofing", "Roof inspection and documentation"],
  },
  {
    slug: "park-ridge",
    name: "Park Ridge",
    title: "Roofing Contractor in Park Ridge, IL | Roof Repair & Replacement",
    description: "Intex provides roofing repair, replacement, inspections and storm-damage support for homes and properties in Park Ridge, Illinois.",
    intro: "Intex serves Park Ridge property owners with roofing support focused on preserving the building envelope, identifying the source of leaks and planning repairs or replacement without unnecessary complexity.",
    indexable: true,
    propertyFocus: "Single-family homes, larger residential properties and commercial buildings",
    roofingContext: "Roof performance depends on more than the visible surface. Ventilation, flashing, penetrations, valleys, edges and drainage all matter when evaluating leaks, age-related wear and storm exposure.",
    highlights: ["Roof repair", "Full roof replacement", "Storm-damage assessment", "Flashing and leak diagnosis", "Roof inspections", "Commercial roofing support"],
  },
  {
    slug: "glenview",
    name: "Glenview",
    title: "Roofing Contractor in Glenview, IL | Intex Chicago Roofing",
    description: "Roof repair, replacement, inspections and storm-damage roofing support for homeowners and properties in Glenview, Illinois.",
    intro: "Intex helps Glenview homeowners and property owners evaluate roof condition, correct active problems and plan replacement when the existing system is no longer performing reliably.",
    indexable: true,
    propertyFocus: "Single-family homes, residential properties and commercial buildings",
    roofingContext: "A roof in Glenview needs to perform through strong storms, winter weather and large temperature swings. Careful attention to shingles or membrane condition, flashing, penetrations and drainage helps separate isolated repairs from broader system failure.",
    highlights: ["Roof repairs and leak diagnosis", "Roof replacement", "Storm and hail inspection", "Residential roofing", "Commercial roofing", "Roof condition assessments"],
  },
  {
    slug: "oak-park",
    name: "Oak Park",
    title: "Roofing Contractor in Oak Park, IL | Intex Chicago",
    description: "Intex provides roof repair, flat roofing, replacement and storm-damage support for residential and commercial properties in Oak Park, Illinois.",
    intro: "Oak Park includes a wide variety of roof shapes, ages and building types. Intex approaches each property by identifying the roof system, the source of the concern and whether repair or replacement is the more sensible path.",
    indexable: true,
    propertyFocus: "Older homes, multifamily properties, flat-roof buildings and commercial spaces",
    roofingContext: "Older roof assemblies and additions can create complex transitions, flashing details and drainage conditions. Those areas deserve careful inspection when leaks recur or a roof has been repaired multiple times.",
    highlights: ["Repair of recurring roof leaks", "Roof replacement", "Flat and low-slope roofing", "Storm-damage assessment", "Flashing and transition details", "Multifamily and commercial roofing"],
  },
  {
    slug: "cicero",
    name: "Cicero",
    title: "Roofing Contractor in Cicero, IL | Roof Repair & Flat Roofing",
    description: "Roof repair, replacement, flat roofing, commercial roofing and storm-damage support for properties in Cicero, Illinois.",
    intro: "Intex provides roofing support in Cicero for residential, multifamily and commercial properties, with particular attention to leak diagnosis, low-slope roof conditions and practical replacement planning.",
    indexable: true,
    propertyFocus: "Homes, multifamily buildings, flat-roof properties and commercial spaces",
    roofingContext: "Flat and low-slope roofing requires dependable drainage, sound seams and penetrations, and careful flashing details. Severe weather and freeze-thaw cycles can accelerate small weaknesses into active leaks.",
    highlights: ["Flat-roof repair", "Residential roof repair", "Roof replacement", "Commercial roofing", "Storm-damage inspections", "Leak and drainage diagnosis"],
  },
  {
    slug: "schaumburg",
    name: "Schaumburg",
    title: "Roofing Contractor in Schaumburg, IL | Commercial & Residential Roofing",
    description: "Residential and commercial roof repair, replacement, inspections and storm-damage roofing services in Schaumburg, Illinois.",
    intro: "Intex serves Schaumburg homeowners, businesses and property managers with roofing assessments, repairs and replacement planning for both steep-slope and commercial roof systems.",
    indexable: true,
    propertyFocus: "Homes, retail and office properties, commercial facilities and multifamily buildings",
    roofingContext: "Large commercial roofs and residential systems face different drainage and maintenance demands, but both are exposed to Chicagoland wind, hail, rain and winter weather. Inspections should focus on the specific roof type and how water leaves the building.",
    highlights: ["Commercial roofing", "Residential roof repair", "Roof replacement", "Storm and hail inspections", "Flat and low-slope roofing", "Property-manager roofing support"],
  },
];

export const serviceAreaBySlug = Object.fromEntries(
  serviceAreas.map((area) => [area.slug, area]),
) as Record<string, ServiceArea>;
