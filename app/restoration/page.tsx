import type { Metadata } from "next";
import Link from "next/link";
import { RoofingServiceVisual, type ServiceVisualType } from "@/components/RoofingServiceVisual";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Property Restoration Services in Chicago",
  description: "Water, fire, mold, storm, trauma and commercial property restoration services for Chicago and Chicagoland properties.",
  alternates: { canonical: "/restoration/" },
  openGraph: {
    title: "Property Restoration Services in Chicago",
    description: "Water, fire, mold, storm, trauma and commercial property restoration services for Chicago and Chicagoland properties.",
    url: "/restoration/",
    type: "website",
  },
};

const restorationServices: Array<{
  title: string;
  description: string;
  href: string;
  visual: ServiceVisualType;
}> = [
  {
    title: "Water Damage Restoration",
    description: "Mitigation and restoration planning for leaks, flooding, plumbing failures and interior water damage.",
    href: "/water-damage-restoration-chicago/",
    visual: "water",
  },
  {
    title: "Fire & Smoke Restoration",
    description: "Cleanup and restoration planning for properties affected by fire, smoke, soot and suppression water.",
    href: "/fire-damage-restoration-chicago/",
    visual: "fire",
  },
  {
    title: "Mold Remediation",
    description: "A coordinated approach to moisture conditions, affected materials, containment and cleanup scope.",
    href: "/mold-remediation-chicago/",
    visual: "mold",
  },
  {
    title: "Storm Damage Restoration",
    description: "Property and roofing support after wind, hail and severe Chicagoland weather.",
    href: "/storm-damage-restoration-chicago/",
    visual: "storm",
  },
  {
    title: "Trauma & Biohazard Cleaning",
    description: "Discreet cleanup coordination for sensitive residential and commercial property situations.",
    href: "/trauma-biohazard-cleaning-chicago/",
    visual: "biohazard",
  },
  {
    title: "Commercial Restoration",
    description: "Coordinated restoration for commercial properties, facilities, managers and multi-unit buildings.",
    href: "/commercial-restoration-chicago/",
    visual: "commercial-restoration",
  },
  {
    title: "Insurance Claim Support",
    description: "Documentation and restoration-scope organization for insured property losses.",
    href: "/insurance-claims/",
    visual: "claims",
  },
];

export default function RestorationHubPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Intex Chicago property restoration services",
    itemListElement: restorationServices.map((service, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: service.title,
      url: `${site.url}${service.href}`,
    })),
  };

  return (
    <main className="servicePage servicePage--restoration">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <section className="serviceHero">
        <div className="serviceHeroStage">
          <div className="serviceHeroInner">
            <div className="serviceBreadcrumbs"><Link href="/">Home</Link> / Restoration</div>
            <p className="kicker"><span /> Chicago property restoration</p>
            <h1>Property damage can take different paths. Start with the one in front of you.</h1>
            <p className="serviceHeroLead">Water, fire, smoke, mold, storm, sensitive cleanup and commercial restoration support for Chicago and Chicagoland properties.</p>
            <div className="serviceHeroActions">
              <a className="primaryButton" href={`tel:${site.phone}`}>Call {site.phoneDisplay}</a>
              <Link className="secondaryButton" href="/estimate/">Start a request <span>↗</span></Link>
            </div>
            <div className="serviceHeroTrust"><span>Chicago property restoration</span><span>Clear next steps</span><span>Documented scope</span></div>
          </div>
          <RoofingServiceVisual type="water" label="Property restoration visual" />
        </div>
      </section>

      <section className="serviceBody">
        <div className="relatedServices relatedServicesPremium">
          <div className="relatedServicesIntro">
            <div><p className="kicker dark"><span /> Restoration services</p><h2>Choose the condition that best matches the property.</h2></div>
            <p>Property damage can overlap. Start with the most immediate condition and use the service page to understand the next step.</p>
          </div>
          <div className="relatedGrid relatedGridPremium">
            {restorationServices.map((service, index) => (
              <Link className={`relatedCard relatedCardPremium relatedCardPremium--${(index % 4) + 1}`} href={service.href} key={service.href} data-visual={service.visual}>
                <RoofingServiceVisual type={service.visual} compact label={`${service.title} visual`} />
                <div className="relatedCardTop"><span className="relatedIndex">{String(index + 1).padStart(2, "0")}</span><span className="relatedTypeLabel">restoration</span></div>
                <div className="relatedCardCopy"><strong>{service.title}</strong><small>{service.description}</small></div>
                <div className="relatedCardAction"><span>Explore service</span><b>↗</b></div>
              </Link>
            ))}
          </div>
        </div>

        <div className="serviceCta">
          <div><p className="kicker"><span /> Intex Restoration · Chicagoland</p><h2>Not sure which service fits?</h2></div>
          <div><p>Tell us what happened and where the property is located. We can organize the request around the condition you are seeing.</p><div className="heroActions"><a className="primaryButton" href={`tel:${site.phone}`}>Call {site.phoneDisplay}</a><Link className="secondaryButton" href="/estimate/">Start request</Link></div></div>
        </div>
      </section>
    </main>
  );
}
