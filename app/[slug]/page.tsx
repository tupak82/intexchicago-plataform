import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AnimatedProcessSteps } from "@/components/AnimatedProcessSteps";
import { site } from "@/lib/site";
import { serviceBySlug, servicePages } from "@/lib/services";

export function generateStaticParams() {
  return servicePages.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const service = serviceBySlug[slug];
  if (!service) return {};
  const canonical = `/${service.slug}/`;
  return {
    title: service.title,
    description: service.description,
    alternates: { canonical },
    openGraph: {
      title: service.title,
      description: service.description,
      url: canonical,
      type: "website",
    },
  };
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = serviceBySlug[slug];
  if (!service) notFound();

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    description: service.description,
    areaServed: "Chicagoland",
    provider: {
      "@type": "GeneralContractor",
      name: site.name,
      url: site.url,
      telephone: site.phone,
    },
  };

  return (
    <main className="servicePage">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />

      <section className="serviceHero">
        <div className="serviceHeroInner">
          <div className="serviceBreadcrumbs"><a href="/">Home</a> / {service.name}</div>
          <p className="kicker"><span /> {service.eyebrow}</p>
          <h1>{service.title}</h1>
          <p className="serviceHeroLead">{service.description}</p>
          <div className="serviceHeroActions">
            <a className="primaryButton" href={`tel:${site.phone}`}>{service.emergency ? "Get emergency help" : "Call Intex"}</a>
            <a className="secondaryButton" href="/#estimate">Request an estimate <span>↗</span></a>
          </div>
        </div>
      </section>

      <section className="serviceBody">
        <div className="serviceSplit">
          <div>
            <p className="kicker dark"><span /> Common situations</p>
            <h2>When to call Intex</h2>
          </div>
          <ul className="serviceList">
            {service.problems.map((problem) => <li key={problem}>{problem}</li>)}
          </ul>
        </div>

        <div className="serviceProcess">
          <p className="kicker dark"><span /> A clearer recovery process</p>
          <h2>What happens next</h2>
          <AnimatedProcessSteps steps={service.process} ariaLabel={`${service.name} process`} />
        </div>

        <div className="relatedServices">
          <p className="kicker dark"><span /> Connected services</p>
          <h2>Related help</h2>
          <div className="relatedGrid">
            {service.related.map((relatedSlug) => {
              const related = serviceBySlug[relatedSlug];
              return related ? <a className="relatedCard" href={`/${related.slug}/`} key={related.slug}><span>Explore</span>{related.name}</a> : null;
            })}
          </div>
        </div>

        <div className="serviceCta">
          <div>
            <p className="kicker"><span /> Intex Restoration · Chicagoland</p>
            <h2>{service.emergency ? "Property damage does not wait. Neither should the first call." : "Ready to plan the next step?"}</h2>
          </div>
          <div>
            <p>Tell us what happened and where the property is located. For active emergencies, calling is the fastest way to reach the team.</p>
            <div className="heroActions">
              <a className="primaryButton" href={`tel:${site.phone}`}>Call {site.phoneDisplay}</a>
              <a className="secondaryButton" href="mailto:info@intexchicago.com">Email Intex</a>
            </div>
          </div>
        </div>
      </section>

      <footer className="serviceFooter">
        <span>Intex Restoration · Chicago restoration & roofing</span>
        <a href="/">Back to home</a>
      </footer>
    </main>
  );
}