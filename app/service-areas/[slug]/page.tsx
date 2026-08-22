import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { serviceAreaBySlug, serviceAreas } from "@/lib/service-areas";
import { servicePages } from "@/lib/services";
import { site } from "@/lib/site";

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
    name: `Property restoration and roofing in ${area.name}`,
    areaServed: { "@type": "City", name: area.name },
    provider: { "@type": "GeneralContractor", name: site.name, url: site.url, telephone: site.phone },
  };

  return (
    <main className="platformPage">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <section className="platformHero">
        <div className="platformBreadcrumbs"><a href="/">Home</a> / <a href="/service-areas/">Service Areas</a> / {area.name}</div>
        <p className="kicker"><span /> Chicago property services</p>
        <h1>{area.title}</h1>
        <p>{area.intro}</p>
        <div className="heroActions">
          <a className="primaryButton" href={`/estimate/?area=${area.slug}`}>Request an estimate</a>
          <a className="secondaryButton" href={`tel:${site.phone}`}>Call {site.phoneDisplay}</a>
        </div>
      </section>

      <section className="platformSection platformSplit">
        <div>
          <p className="kicker dark"><span /> Coverage</p>
          <h2>Property restoration built around the problem, not a generic location page.</h2>
        </div>
        <ul className="platformList">
          {area.highlights.map((item) => <li key={item}>{item}</li>)}
        </ul>
      </section>

      <section className="platformSection">
        <p className="kicker dark"><span /> Services in {area.name}</p>
        <div className="platformGrid">
          {servicePages.slice(0, 6).map((service) => (
            <a className="platformCard" href={`/${service.slug}/`} key={service.slug}>
              <span>{service.eyebrow}</span>
              <h2>{service.name}</h2>
              <p>{service.description}</p>
              <b>View service →</b>
            </a>
          ))}
        </div>
      </section>
    </main>
  );
}
