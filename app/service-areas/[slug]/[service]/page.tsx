import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AnimatedProcessSteps } from "@/components/AnimatedProcessSteps";
import { isLocalRoofingPage, localRoofingCopy, localRoofingPages } from "@/lib/local-roofing";
import { site } from "@/lib/site";

export function generateStaticParams() {
  return localRoofingPages.map((page) => ({ slug: page.areaSlug, service: page.servicePathSlug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string; service: string }> }): Promise<Metadata> {
  const { slug, service } = await params;
  const page = isLocalRoofingPage(slug, service);
  if (!page) return {};

  const canonical = `/service-areas/${page.area.slug}/${service}/`;
  const title = `${page.service.name} in ${page.area.name}, IL`;
  const description = `${page.service.name} for ${page.area.name} homeowners and property owners. Intex Chicago provides roofing assessment, repair planning and clear next steps for local properties.`;

  return {
    title,
    description,
    alternates: { canonical },
    robots: { index: true, follow: true },
    openGraph: { title, description, url: canonical, type: "website" },
  };
}

export default async function LocalRoofingServicePage({ params }: { params: Promise<{ slug: string; service: string }> }) {
  const { slug, service } = await params;
  const page = isLocalRoofingPage(slug, service);
  if (!page) notFound();

  const copy = localRoofingCopy(page.area.slug, page.serviceSlug);
  if (!copy) notFound();

  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `${page.service.name} in ${page.area.name}, Illinois`,
    serviceType: page.service.name,
    areaServed: { "@type": "City", name: page.area.name },
    provider: {
      "@type": "RoofingContractor",
      name: site.name,
      url: site.url,
      telephone: site.phone,
      email: site.email,
    },
  };

  return (
    <main className="servicePage">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <section className="serviceHero">
        <div className="serviceHeroInner">
          <div className="serviceBreadcrumbs"><a href="/">Home</a> / <a href="/service-areas/">Service Areas</a> / <a href={`/service-areas/${page.area.slug}/`}>{page.area.name}</a> / {page.service.name}</div>
          <p className="kicker"><span /> {page.service.name} · {page.area.name}, Illinois</p>
          <h1>{page.service.name} in {page.area.name}, IL</h1>
          <p className="serviceHeroLead">{copy.intent}</p>
          <div className="serviceHeroActions">
            <a className="primaryButton" href={`/estimate/?area=${page.area.slug}&service=${page.serviceSlug}`}>Request a roofing estimate</a>
            <a className="secondaryButton" href={`tel:${site.phone}`}>Call {site.phoneDisplay}</a>
          </div>
        </div>
      </section>

      <section className="serviceBody">
        <div className="serviceSplit">
          <div>
            <p className="kicker dark"><span /> Roofing in {page.area.name}</p>
            <h2>The right plan starts with the roof system and what the property is showing.</h2>
            <p>{page.area.roofingContext}</p>
          </div>
          <div>
            <p>{copy.focus}</p>
            <p><strong>Property focus:</strong> {page.area.propertyFocus}.</p>
          </div>
        </div>

        <div className="serviceProcess">
          <p className="kicker dark"><span /> When {page.service.name.toLowerCase()} makes sense</p>
          <h2>Look at condition, urgency and the pattern of damage.</h2>
          <p>{copy.decision}</p>
          <AnimatedProcessSteps steps={page.service.problems.slice(0, 4)} ariaLabel={`${page.service.name} warning signs`} />
        </div>

        <div className="serviceProcess">
          <p className="kicker dark"><span /> From inspection to next step</p>
          <h2>What to expect from the {page.service.name.toLowerCase()} process.</h2>
          <AnimatedProcessSteps steps={page.service.process} ariaLabel={`${page.service.name} process`} />
        </div>

        <div className="serviceCta">
          <div>
            <p className="kicker"><span /> Intex Chicago Roofing · {page.area.name}</p>
            <h2>Need help deciding what your roof needs?</h2>
          </div>
          <div>
            <p>Tell us what you are seeing, where the property is located and whether there is active leaking or recent storm damage.</p>
            <div className="heroActions">
              <a className="primaryButton" href={`/estimate/?area=${page.area.slug}&service=${page.serviceSlug}`}>Start roofing request</a>
              <a className="secondaryButton" href={`mailto:${site.email}`}>{site.email}</a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}