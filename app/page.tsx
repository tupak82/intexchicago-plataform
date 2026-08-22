import { site } from "@/lib/site";

const serviceCards = [
  { title: "Water Damage", eyebrow: "Emergency response", description: "Fast mitigation and restoration when leaks, flooding, or failed plumbing threatens your property." },
  { title: "Fire Damage", eyebrow: "Restore with confidence", description: "Coordinated cleanup and restoration for homes and commercial spaces after fire and smoke damage." },
  { title: "Roof Repair", eyebrow: "Protect what matters", description: "Roof repair and restoration built for Chicago weather and long-term performance." },
  { title: "Storm Damage", eyebrow: "Chicago weather ready", description: "Assessment and restoration after wind, hail, and severe weather damage." },
  { title: "Mold Cleanup", eyebrow: "Healthy spaces", description: "Professional mold cleanup and remediation designed to address the source, not just the surface." },
  { title: "Commercial", eyebrow: "Keep business moving", description: "A single restoration partner for commercial properties, emergencies, and complex recovery work." },
];

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "GeneralContractor",
  name: site.name,
  url: site.url,
  telephone: site.phone,
  areaServed: "Chicagoland",
  description: site.description,
  openingHours: "Mo-Su 00:00-23:59",
};

export default function Home() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />

      <header className="siteHeader">
        <a className="brand" href="#top" aria-label="Intex Restoration home">
          <span className="brandMark">IX</span>
          <span><strong>INTEX</strong><small>RESTORATION</small></span>
        </a>
        <nav aria-label="Primary navigation">
          <a href="#services">Services</a>
          <a href="#why-intex">Why Intex</a>
          <a className="navCall" href={`tel:${site.phone}`}>Call 24/7</a>
        </nav>
      </header>

      <section className="hero" id="top">
        <div className="heroGlow heroGlowOne" />
        <div className="heroGlow heroGlowTwo" />
        <div className="heroContent">
          <p className="kicker"><span /> Chicago restoration + roofing</p>
          <h1>When your property needs help, <em>every minute matters.</em></h1>
          <p className="heroLead">24/7 restoration and roofing for homes and businesses throughout Chicagoland. One experienced team from emergency response through the final detail.</p>
          <div className="heroActions">
            <a className="primaryButton" href={`tel:${site.phone}`}>Call {site.phoneDisplay}</a>
            <a className="secondaryButton" href="#estimate">Get a free estimate <span>↗</span></a>
          </div>
          <div className="trustRow" aria-label="Service highlights">
            <span><b>24/7</b> emergency response</span>
            <span><b>Since 2009</b> serving Chicagoland</span>
            <span><b>Licensed</b> & insured</span>
          </div>
        </div>
        <div className="heroVisual" aria-hidden="true">
          <div className="gridPlane" />
          <div className="building buildingBack" />
          <div className="building buildingFront"><span>INTEX</span></div>
          <div className="statusCard"><i /> Emergency team available <strong>24/7</strong></div>
        </div>
      </section>

      <section className="servicesSection" id="services">
        <div className="sectionHeading">
          <div>
            <p className="kicker dark"><span /> What we restore</p>
            <h2>One team. Six ways to get your property back.</h2>
          </div>
          <p>Residential and commercial restoration built around a simple promise: respond quickly, communicate clearly, and do the work right.</p>
        </div>
        <div className="serviceGrid">
          {serviceCards.map((service, index) => (
            <article className="serviceCard" key={service.title}>
              <div className="serviceNumber">0{index + 1}</div>
              <p>{service.eyebrow}</p>
              <h3>{service.title}</h3>
              <span>{service.description}</span>
              <a href="#estimate" aria-label={`Get an estimate for ${service.title}`}>Explore service <b>↗</b></a>
            </article>
          ))}
        </div>
      </section>

      <section className="proofSection" id="why-intex">
        <div className="proofIntro">
          <p className="kicker"><span /> Built for Chicagoland</p>
          <h2>Restoration should feel controlled, even when the situation isn&apos;t.</h2>
        </div>
        <div className="proofGrid">
          <article><strong>01</strong><h3>Rapid response</h3><p>Around-the-clock availability when water, fire, storms, or property damage can&apos;t wait.</p></article>
          <article><strong>02</strong><h3>One accountable team</h3><p>Residential and commercial restoration coordinated through one experienced contractor.</p></article>
          <article><strong>03</strong><h3>Long-term workmanship</h3><p>Solutions focused on restoring the property correctly, not simply covering the visible damage.</p></article>
        </div>
      </section>

      <section className="estimateSection" id="estimate">
        <div>
          <p className="kicker dark"><span /> Start here</p>
          <h2>Tell us what happened. We&apos;ll help you plan the next move.</h2>
          <p>For emergencies, call now. For planned roofing or restoration work, request a free estimate.</p>
        </div>
        <div className="estimateActions">
          <a className="primaryButton light" href={`tel:${site.phone}`}>Call {site.phoneDisplay}</a>
          <a className="textLink" href="mailto:info@intexchicago.com">info@intexchicago.com ↗</a>
        </div>
      </section>

      <footer>
        <div className="brand footerBrand"><span className="brandMark">IX</span><span><strong>INTEX</strong><small>RESTORATION</small></span></div>
        <p>Chicago restoration, roofing, and emergency property services.</p>
        <p>© {new Date().getFullYear()} Intex Restoration</p>
      </footer>
    </main>
  );
}
