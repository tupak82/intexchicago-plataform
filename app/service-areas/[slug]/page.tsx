import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { serviceAreaBySlug, serviceAreas } from "@/lib/service-areas";
import { serviceBySlug } from "@/lib/services";
import { localRoofingPages, localRoofingPath, type LocalRoofingServiceSlug } from "@/lib/local-roofing";
import { site } from "@/lib/site";

const roofingSlugs = [
  "roof-repair-chicago",
  "roof-replacement-chicago",
  "flat-roofing-chicago",
  "commercial-roofing-chicago",
  "roof-inspection-chicago",
  "storm-damage-restoration-chicago",
] as const;

const localizable = new Set<LocalRoofingServiceSlug>([
  "roof-repair-chicago",
  "roof-replacement-chicago",
  "flat-roofing-chicago",
  "commercial-roofing-chicago",
]);

function serviceHref(areaSlug: string, serviceSlug: string) {
  if (localizable.has(serviceSlug as LocalRoofingServiceSlug)) {
    const exists = localRoofingPages.some((page) => page.areaSlug === areaSlug && page.serviceSlug === serviceSlug);
    if (exists) return localRoofingPath(areaSlug, serviceSlug as LocalRoofingServiceSlug);
  }
  return `/${serviceSlug}/`;
}

export function generateStaticParams() {
  return serviceAreas.filter((area) => area.indexable).map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const area = serviceAreaBySlug[slug];
  if (!area) return {};
  const canonical = `/service-areas/${area.slug}/`;
  return {
    title: area.title,
    description: area.description,
    alternates: { canonical },
    robots: { index: area.indexable, follow: true },
    openGraph: { title: area.title, description: area.description, url: canonical, type: "website" },
  };
}

export default async function ServiceAreaPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const area = serviceAreaBySlug[slug];
  if (!area || !area.indexable) notFound();

  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `Roofing services in ${area.name}, Illinois`,
    serviceType: "Roofing",
    areaServed: { "@type": "City", name: area.name },
    provider: {
      "@type": "RoofingContractor",
      name: site.name,
      url: site.url,
      telephone: site.phone,
      email: site.email,
    },
  };

  return (
    <main className="platformPage">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <section className="platformHero">
        <div className="platformBreadcrumbs"><a href="/">Home</a> / <a href="/service-areas/">Service Areas</a> / {area.name}</div>
        <p className="kicker"><span /> Roofing in {area.name}, Illinois</p>
        <h1>{area.title}</h1>
        <p>{area.intro}</p>
        <div className="heroActions">
          <a className="primaryButton" href={`/estimate/?area=${area.slug}&service=roofing`}>Request a roofing estimate</a>
          <a className="secondaryButton" href={`tel:${site.phone}`}>Call {site.phoneDisplay}</a>
        </div>
      </section>

      <section className="platformSection platformSplit">
        <div>
          <p className="kicker dark"><span /> Local roofing context</p>
          <h2>Roofing decisions should match the property and the roof system.</h2>
          <p>{area.roofingContext}</p>
          <p><strong>Property focus:</strong> {area.propertyFocus}.</p>
        </div>
        <ul className="platformList">
          {area.highlights.map((item) => <li key={item}>{item}</li>)}
        </ul>
      </section>

      <section className="platformSection">
        <p className="kicker dark"><span /> Roofing services in {area.name}</p>
        <div className="platformGrid">
          {roofingSlugs.map((serviceSlug) => serviceBySlug[serviceSlug]).filter(Boolean).map((service) => (
            <a className="platformCard" href={serviceHref(area.slug, service.slug)} key={service.slug}>
              <span>{service.eyebrow}</span>
              <h2>{service.name}</h2>
              <p>{service.description}</p>
              <b>View {service.name.toLowerCase()} in {area.name} →</b>
            </a>
          ))}
        </div>
      </section>

      <section className="platformSection platformSplit">
        <div>
          <p className="kicker dark"><span /> Repair or replace?</p>
          <h2>Start with the condition of the roof, not a sales script.</h2>
        </div>
        <div>
          <p>A localized leak or flashing failure may call for a focused repair. Widespread deterioration, repeated leaks or major storm damage can point toward replacement. The first step is understanding the roof condition and the urgency of the problem.</p>
          <div className="heroActions">
            <a className="primaryButton" href={`/estimate/?area=${area.slug}&service=roofing`}>Start a roofing request</a>
            <a className="textLink" href="/roof-inspection-chicago/">Explore roof inspections →</a>
          </div>
        </div>
      </section>
    </main>
  );
}
