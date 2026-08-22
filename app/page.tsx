import { site } from "@/lib/site";

const serviceCards = [
  { title: "Water Damage", eyebrow: "Emergency response", href: "/water-damage-restoration-chicago/", description: "Fast mitigation and restoration when leaks, flooding, or failed plumbing threatens your property." },
  { title: "Fire Damage", eyebrow: "Restore with confidence", href: "/fire-damage-restoration-chicago/", description: "Coordinated cleanup and restoration for homes and commercial spaces after fire and smoke damage." },
  { title: "Roofing", eyebrow: "Protect what matters", href: "/roofing-chicago/", description: "Roof repair and restoration built for Chicago weather and long-term performance." },
  { title: "Storm Damage", eyebrow: "Chicago weather ready", href: "/storm-damage-restoration-chicago/", description: "Assessment and restoration after wind, hail, and severe weather damage." },
  { title: "Mold Cleanup", eyebrow: "Healthy spaces", href: "/mold-remediation-chicago/", description: "Professional mold cleanup and remediation designed to address the source, not just the surface." },
  { title: "Commercial", eyebrow: "Keep business moving", href: "/commercial-restoration-chicago/", description: "A single restoration partner for commercial properties, emergencies, and complex recovery work." },
];

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "GeneralContractor",
  name: site.name,
  url: site.url,
  telephone: site.phone,
  email: site.email,
  areaServed: "Chicagoland",
  description: site.description,
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
          <a href="/roofing-chicago/">Roofing</a>
          <a href="/projects/">Projects</a>
          <a href="/resources/">Resources</a>
          <a href="/service-areas/">Service Areas</a>
          <a className="navCall" href={`tel:${site.phone}`}>Call now</a>
        </nav>
      </header>

      <section className="hero" id="top">
        <div className="heroGlow heroGlowOne" />
        <div className="heroGlow heroGlowTwo" />
        <div className="heroContent">
          <p className="kicker"><span /> Chicago restoration + roofing</p>
          <h1>When your property needs help, <em>every minute matters.</em></h1>
          <p className="heroLead">Restoration and roofing for homes and businesses throughout Chicagoland. One experienced team from the first assessment through the final detail.</p>
          <div className="heroActions">
            <a className="primaryButton" href={`tel:${site.phone}`}>Call {site.phoneDisplay}</a>
            <a className="secondaryButton" href="/estimate/">Request an estimate <span>↗</span></a>
          </div>
          <div className="trustRow" aria-label="Service highlights">
            <span><b>Chicago</b> + Chicagoland</span>
            <span><b>Roofing</b> + restoration</span>
            <span><b>Residential</b> + commercial</span>
          </div>
        </div>
        <div className="heroVisual" aria-hidden="true">
          <div className="gridPlane" />
          <div className="building buildingBack" />
          <div className="building buildingFront"><span>INTEX</span></div>
          <div className="statusCard"><i /> Property help <strong>one call away</strong></div>
        </div>
      </section>

      <section className="servicesSection" id="services">
        <div className="sectionHeading">
          <div>
            <p className="kicker dark"><span /> What we restore</p>
            <h2>One team. Multiple ways to get your property back.</h2>
          </div>
          <p>Residential and commercial restoration built around a simple promise: respond clearly, communicate well, and focus on the work your property actually needs.</p>
        </div>
        <div className="serviceGrid">
          {serviceCards.map((service, index) => (
            <article className="serviceCard" key={service.title}>
              <div className="serviceNumber">0{index + 1}</div>
              <p>{service.eyebrow}</p>
              <h3>{service.title}</h3>
              <span>{service.description}</span>
              <a href={service.href} aria-label={`Explore ${service.title}`}>Explore service <b>↗</b></a>
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
          <article><strong>01</strong><h3>Clear first response</h3><p>Start by explaining what happened, where the property is, and what needs immediate attention.</p></article>
          <article><strong>02</strong><h3>One accountable team</h3><p>Residential and commercial restoration coordinated through one contractor instead of a maze of disconnected pages.</p></article>
          <article><strong>03</strong><h3>Built around the property</h3><p>The new platform guides customers to the right service, whether the issue is roofing, water, fire, storm, mold, or commercial restoration.</p></article>
        </div>
      </section>

      <section className="estimateSection" id="estimate">
        <div>
          <p className="kicker dark"><span /> Start here</p>
          <h2>Tell us what happened. We&apos;ll help you plan the next move.</h2>
          <p>For active property damage, call now. For planned roofing or restoration work, use the guided request.</p>
        </div>
        <div className="estimateActions">
          <a className="primaryButton light" href="/estimate/">Start request</a>
          <a className="textLink" href={`tel:${site.phone}`}>Call {site.phoneDisplay} ↗</a>
        </div>
      </section>

      <footer>
        <div className="brand footerBrand"><span className="brandMark">IX</span><span><strong>INTEX</strong><small>RESTORATION</small></span></div>
        <p><a href="/about/">About</a> · <a href="/projects/">Projects</a> · <a href="/resources/">Resources</a> · <a href="/service-areas/">Service Areas</a> · <a href="/contact/">Contact</a></p>
        <p>© {new Date().getFullYear()} Intex Restoration</p>
      </footer>
    </main>
  );
}
