import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AnimatedProcessSteps } from "@/components/AnimatedProcessSteps";
import { RoofingServiceVisual } from "@/components/RoofingServiceVisual";
import { site } from "@/lib/site";
import { serviceBySlug, servicePages } from "@/lib/services";

type VisualType = "repair" | "replacement" | "storm" | "flat" | "commercial" | "inspection" | "roofing";

export function generateStaticParams() { return servicePages.map(({ slug }) => ({ slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params; const service = serviceBySlug[slug]; if (!service) return {};
  const canonical = `/${service.slug}/`;
  return { title: service.title, description: service.description, alternates: { canonical }, openGraph: { title: service.title, description: service.description, url: canonical, type: "website" } };
}

function visualTypeForSlug(slug: string): VisualType {
  if (slug.includes("flat")) return "flat"; if (slug.includes("commercial")) return "commercial"; if (slug.includes("inspection")) return "inspection"; if (slug.includes("replacement")) return "replacement"; if (slug.includes("repair")) return "repair"; if (slug.includes("storm") || slug.includes("hail")) return "storm"; return "roofing";
}

function relatedMicroCopy(type: VisualType) {
  if (type === "inspection") return "Find weak points before they become expensive failures.";
  if (type === "replacement") return "A complete roofing system rebuilt for long-term protection.";
  if (type === "repair") return "Stop active damage and restore the vulnerable part of the roof.";
  if (type === "storm") return "Hail and wind response built around fast inspection and recovery.";
  if (type === "flat") return "Membrane and low-slope roofing built for Chicago multifamily properties.";
  if (type === "commercial") return "Large-scale roofing planned around operations, access and safety.";
  return "Protect the full roofing system from the top down.";
}

function chicagoContextForSlug(slug: string): string[] {
  const copy: Record<string, string[]> = {
    "roofing-chicago": [
      "Chicago roofs deal with a climate that behaves differently from much of Illinois. The city sees more than 38 inches of snow in a typical year, and repeated freeze-thaw cycles can build ice dams at roof edges. That is why a Chicago roofing plan has to consider ventilation, drainage, flashing and winter water backup—not just the visible surface.",
      "Material choice matters too. Impact-resistant Class 4 architectural shingles can be a practical option for single-family homes exposed to hail, standing-seam metal can suit owners planning for a long ownership horizon, and TPO membrane systems are especially relevant to the flat roofs found on many Chicago two-flats and three-flats."
    ],
    "roof-repair-chicago": [
      "A Chicago roof repair should stay focused on the actual failure point. Freeze-thaw movement, flashing defects, lifted shingles and small membrane punctures can create localized leaks that do not require treating the entire roof like a replacement project.",
      "After hail, damage can be subtle from the ground. We look for surface bruising, granule loss and related evidence on soft metals such as gutters, vents and outdoor equipment fins so the repair decision is based on documented conditions rather than guesswork."
    ],
    "roof-replacement-chicago": [
      "Replacement in Chicago is not simply a cosmetic shingle swap. A complete project is an opportunity to rebuild the roofing assembly for local snow, hail and freeze-thaw exposure, including underlayment, flashing, ventilation and edge conditions before the finished roof goes on.",
      "For steep-slope homes, Class 4 impact-resistant architectural shingles may make sense where hail resistance is a priority; standing-seam metal can be considered for long-term ownership. The right choice depends on the building, roof geometry, budget and expected ownership period—not a one-material-fits-all claim."
    ],
    "storm-damage-restoration-chicago": [
      "Chicago's active hail season typically runs from May through August, and recent suburban storms have produced hail larger than two inches. Roof damage from those events is often not obvious from the street, which is why a close inspection matters before assuming the roof is fine.",
      "We document bruising and granule loss on roofing surfaces and also check soft-metal indicators such as gutters, vents and air-conditioning fins. Those dents can provide objective evidence of hail size and direction during an insurance inspection."
    ],
    "flat-roofing-chicago": [
      "Flat roofing is part of Chicago's building identity, especially on two-flats, three-flats and other urban multifamily properties. These roofs need membrane details, welded seams, penetrations and drainage evaluated as one system; treating them like shingle roofs misses how low-slope assemblies actually fail.",
      "TPO is one common membrane option for low-slope roofs. In Chicago, good drainage is especially important because snowmelt and freeze-thaw cycles can keep water moving across the roof and into vulnerable seams or penetrations if the system is not detailed correctly."
    ],
    "commercial-roofing-chicago": [
      "Commercial and multi-unit Chicago roofs are frequently low-slope systems where membrane continuity and drainage matter more than shingle-style detailing. TPO and similar assemblies rely on sound seams, penetrations, flashing and drains to move water away from the building while work is coordinated around tenants and operations.",
      "Storm inspections should include more than the membrane itself. Hail evidence on rooftop vents, metal edges, gutters and HVAC fins can help document what happened even when membrane damage is difficult to see from below."
    ],
    "roof-inspection-chicago": [
      "Chicago hail damage can be easy to miss from the sidewalk. A useful roof inspection looks closely for bruising, granule loss, lifted materials, flashing movement and winter-related edge conditions instead of relying on a quick ground-level view.",
      "Soft-metal evidence matters during storm documentation. Dents in gutters, vents and HVAC fins can provide objective clues about hail impact, while winter inspections should also look for conditions that encourage ice dams and water backup under roof coverings."
    ]
  };
  return copy[slug] ?? [];
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const service = serviceBySlug[slug]; if (!service) notFound();
  const visualType = visualTypeForSlug(service.slug); const chicagoContext = chicagoContextForSlug(service.slug);
  const serviceSchema = { "@context": "https://schema.org", "@type": "Service", name: service.name, description: service.description, areaServed: "Chicagoland", provider: { "@type": "GeneralContractor", name: site.name, url: site.url, telephone: site.phone } };

  return <main className={`servicePage servicePage--${visualType}`}>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
    <section className="serviceHero"><div className="serviceHeroStage"><div className="serviceHeroInner"><div className="serviceBreadcrumbs"><a href="/">Home</a> / {service.name}</div><p className="kicker"><span /> {service.eyebrow}</p><h1>{service.title}</h1><p className="serviceHeroLead">{service.description}</p><div className="serviceHeroActions"><a className="primaryButton" href={`tel:${site.phone}`}>{service.emergency ? "Get emergency help" : "Call Intex"}</a><a className="secondaryButton" href="/estimate/">Request an estimate <span>↗</span></a></div><div className="serviceHeroTrust"><span>Chicago roofing specialists</span><span>Clear scope</span><span>Documented work</span></div></div><RoofingServiceVisual type={visualType} label={`${service.name} visual`} /></div></section>
    <section className="serviceBody">
      {chicagoContext.length > 0 && <div className="serviceSplit"><div><p className="kicker dark"><span /> Built for Chicago</p><h2>Why this service is different here</h2></div><div>{chicagoContext.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div></div>}
      <div className="serviceSplit"><div><p className="kicker dark"><span /> Common situations</p><h2>When to call Intex</h2></div><ul className="serviceList">{service.problems.map((problem) => <li key={problem}>{problem}</li>)}</ul></div>
      <div className="serviceProcess"><p className="kicker dark"><span /> A clearer recovery process</p><h2>What happens next</h2><AnimatedProcessSteps steps={service.process} ariaLabel={`${service.name} process`} /></div>
      <div className="relatedServices relatedServicesPremium"><div className="relatedServicesIntro"><div><p className="kicker dark"><span /> Connected roofing system</p><h2>One roof. Different problems. <em>One smarter next step.</em></h2></div><p>Each service solves a different failure point in the building envelope. Explore the service that matches what your property is actually facing.</p></div><div className="relatedGrid relatedGridPremium">{service.related.map((relatedSlug,index)=>{const related=serviceBySlug[relatedSlug];if(!related)return null;const relatedVisualType=visualTypeForSlug(related.slug);return <a className={`relatedCard relatedCardPremium relatedCardPremium--${index+1}`} href={`/${related.slug}/`} key={related.slug} data-visual={relatedVisualType}><RoofingServiceVisual type={relatedVisualType} compact label={`${related.name} visual`} /><div className="relatedCardTop"><span className="relatedIndex">0{index+1}</span><span className="relatedTypeLabel">{relatedVisualType}</span></div><div className="relatedCardCopy"><strong>{related.name}</strong><small>{relatedMicroCopy(relatedVisualType)}</small></div><div className="relatedCardAction"><span>Explore service</span><b>↗</b></div></a>})}</div></div>
      <div className="serviceCta"><div><p className="kicker"><span /> Intex Restoration · Chicagoland</p><h2>{service.emergency ? "Property damage does not wait. Neither should the first call." : "Ready to plan the next step?"}</h2></div><div><p>Tell us what happened and where the property is located. For active emergencies, calling is the fastest way to reach the team.</p><div className="heroActions"><a className="primaryButton" href={`tel:${site.phone}`}>Call {site.phoneDisplay}</a><a className="secondaryButton" href={`mailto:${site.email}`}>Email Intex</a></div></div></div>
    </section>
    <footer className="serviceFooter"><span>Intex Restoration · Chicago restoration & roofing</span><a href="/">Back to home</a></footer>
  </main>;
}
