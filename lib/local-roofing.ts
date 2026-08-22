import { serviceAreaBySlug, serviceAreas } from "@/lib/service-areas";
import { serviceBySlug } from "@/lib/services";

export const localRoofingServiceSlugs = [
  "roof-repair-chicago",
  "roof-replacement-chicago",
  "flat-roofing-chicago",
  "commercial-roofing-chicago",
] as const;

export type LocalRoofingServiceSlug = (typeof localRoofingServiceSlugs)[number];

const servicePath: Record<LocalRoofingServiceSlug, string> = {
  "roof-repair-chicago": "roof-repair",
  "roof-replacement-chicago": "roof-replacement",
  "flat-roofing-chicago": "flat-roofing",
  "commercial-roofing-chicago": "commercial-roofing",
};

const allowedAreas: Record<LocalRoofingServiceSlug, string[]> = {
  "roof-repair-chicago": serviceAreas.map((area) => area.slug),
  "roof-replacement-chicago": serviceAreas.map((area) => area.slug),
  "flat-roofing-chicago": ["chicago", "evanston", "skokie", "niles", "oak-park", "cicero", "schaumburg"],
  "commercial-roofing-chicago": ["chicago", "evanston", "skokie", "niles", "des-plaines", "oak-park", "cicero", "schaumburg"],
};

export function localRoofingPath(areaSlug: string, serviceSlug: LocalRoofingServiceSlug) {
  return `/service-areas/${areaSlug}/${servicePath[serviceSlug]}/`;
}

export function isLocalRoofingPage(areaSlug: string, servicePathSlug: string) {
  const entry = (Object.entries(servicePath) as [LocalRoofingServiceSlug, string][]).find(([, path]) => path === servicePathSlug);
  if (!entry) return null;
  const [serviceSlug] = entry;
  if (!allowedAreas[serviceSlug].includes(areaSlug)) return null;
  const area = serviceAreaBySlug[areaSlug];
  const service = serviceBySlug[serviceSlug];
  if (!area || !area.indexable || !service) return null;
  return { area, service, serviceSlug };
}

export const localRoofingPages = (Object.entries(allowedAreas) as [LocalRoofingServiceSlug, string[]][]).flatMap(
  ([serviceSlug, areas]) =>
    areas.map((areaSlug) => ({
      areaSlug,
      serviceSlug,
      servicePathSlug: servicePath[serviceSlug],
      url: localRoofingPath(areaSlug, serviceSlug),
    })),
);

export function localRoofingCopy(areaSlug: string, serviceSlug: LocalRoofingServiceSlug) {
  const area = serviceAreaBySlug[areaSlug];
  const service = serviceBySlug[serviceSlug];
  if (!area || !service) return null;

  const specifics: Record<LocalRoofingServiceSlug, { intent: string; decision: string; focus: string }> = {
    "roof-repair-chicago": {
      intent: `Roof repair in ${area.name} starts with finding the actual failure point rather than treating every leak as a full replacement project.`,
      decision: "Localized leaks, flashing failures, damaged shingles, punctures and vulnerable penetrations can often be addressed with a targeted repair when the surrounding roof remains serviceable.",
      focus: `For ${area.propertyFocus.toLowerCase()}, the repair assessment should consider the roof surface, flashing, drainage, edges and penetrations together.`,
    },
    "roof-replacement-chicago": {
      intent: `Roof replacement in ${area.name} makes sense when deterioration is widespread, leaks keep returning or the existing system is approaching the end of reliable service.`,
      decision: "A replacement plan should separate urgent protection needs from the long-term roof system, material choice, drainage details and installation sequence.",
      focus: `For ${area.propertyFocus.toLowerCase()}, replacement planning should account for access, protection of the property and the demands of northern Illinois weather.`,
    },
    "flat-roofing-chicago": {
      intent: `Flat roofing in ${area.name} depends heavily on drainage, seams, penetrations, flashing and membrane condition. Small defects can become recurring leaks when water remains on the roof.`,
      decision: "The right next step may be a localized membrane repair, flashing correction, drainage work or replacement when the system has broader deterioration.",
      focus: `${area.roofingContext} That local context is especially important on flat and low-slope roofs.`,
    },
    "commercial-roofing-chicago": {
      intent: `Commercial roofing in ${area.name} needs to protect the building while minimizing disruption to tenants, customers and daily operations.`,
      decision: "A useful commercial roof plan documents current conditions, identifies active risk, separates repair from capital replacement needs and coordinates access around the property.",
      focus: `For ${area.propertyFocus.toLowerCase()}, roof condition, drainage and operational priorities should be reviewed together before work begins.`,
    },
  };

  return specifics[serviceSlug];
}
