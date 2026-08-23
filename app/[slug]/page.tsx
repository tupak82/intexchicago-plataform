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

function relatedVisualType(slug: string) {
  if (slug.includes("repair")) return "repair";
  if (slug.includes("replacement")) return "replacement";
  if (slug.includes("inspection")) return "inspection";
  if (slug.includes("storm") || slug.includes("hail")) return "storm";
  if (slug.includes("commercial") || slug.includes("flat")) return "commercial";
  return "roofing";
}

function relatedMicroCopy(type: string) {
  if (type === "inspection") return "Find weak points before they become expensive failures.";
  if (type === "replacement") return "A complete roofing system rebuilt for long-term protection.";
  if (type === "repair") return "Stop active damage and restore the vulnerable part of the roof.";
  if (type === "storm") return "Hail and wind response built around fast inspection and recovery.";
  if (type === "commercial") return "Low-slope and commercial systems engineered around the building.";
  return "Protect the full roofing system from the top down.";
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

        <div className="relatedServices relatedServicesPremium">
          <div className="relatedServicesIntro">
            <div>
              <p className="kicker dark"><span /> Connected roofing system</p>
              <h2>One roof. Different problems. <em>One smarter next step.</em></h2>
            </div>
            <p>Do not treat roofing services like identical menu cards. Each one solves a different failure point in the building envelope. Explore the service that matches what your property is actually facing.</p>
          </div>

          <div className="relatedGrid relatedGridPremium">
            {service.related.map((relatedSlug, index) => {
              const related = serviceBySlug[relatedSlug];
              if (!related) return null;
              const visualType = relatedVisualType(related.slug);
              return (
                <a
                  className={`relatedCard relatedCardPremium relatedCardPremium--${index + 1}`}
                  href={`/${related.slug}/`}
                  key={related.slug}
                  data-visual={visualType}
                  style={{ "--related-index": index } as React.CSSProperties}
                >
                  <div className="relatedVisual" aria-hidden="true">
                    <div className="relatedSkyGlow" />
                    <div className="relatedScan" />
                    <div className="relatedRoof">
                      <i className="relatedRoofLeft" />
                      <i className="relatedRoofRight" />
                      <i className="relatedRoofBase" />
                    </div>
                    <div className="relatedParticles">
                      <i /><i /><i /><i /><i />
                    </div>
                    <div className="relatedTool" />
                    <div className="relatedPulse" />
                  </div>

                  <div className="relatedCardTop">
                    <span className="relatedIndex">0{index + 1}</span>
                    <span className="relatedTypeLabel">{visualType}</span>
                  </div>

                  <div className="relatedCardCopy">
                    <strong>{related.name}</strong>
                    <small>{relatedMicroCopy(visualType)}</small>
                  </div>

                  <div className="relatedCardAction">
                    <span>Explore service</span>
                    <b>↗</b>
                  </div>
                </a>
              );
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
              <a className="secondaryButton" href={`mailto:${site.email}`}>Email Intex</a>
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
