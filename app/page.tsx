import "./roofing-realism.css";
import { BrandLogo } from "@/components/BrandLogo";
import { site } from "@/lib/site";
import { listPublicReviews } from "@/lib/review-store";

const roofingServices = [
  { title: "Roof Repair", eyebrow: "Leaks + damage", media: "repair", mediaLabel: "Targeted shingle + flashing repair", href: "/roof-repair-chicago/", description: "Targeted repairs for leaks, flashing failures, missing shingles, punctures and weather-related roof damage." },
  { title: "Roof Replacement", eyebrow: "Built for the next decade", media: "replacement", mediaLabel: "Tear-off + new shingle system", href: "/roof-replacement-chicago/", description: "Full replacement planning for aging or heavily damaged roofing systems, with clear options and scope." },
  { title: "Storm Damage", eyebrow: "Wind + hail response", media: "storm", mediaLabel: "Storm impact + damage response", href: "/storm-damage-restoration-chicago/", description: "Roof inspections, temporary protection and restoration support after severe Chicagoland weather." },
  { title: "Flat Roofing", eyebrow: "Chicago property specialty", media: "flat", mediaLabel: "Membrane + low-slope roofing", href: "/flat-roofing-chicago/", description: "Solutions for flat and low-slope roofs common across Chicago homes, multifamily buildings and commercial properties." },
  { title: "Commercial Roofing", eyebrow: "Protect operations", media: "commercial", mediaLabel: "Large-scale commercial roof work", href: "/commercial-roofing-chicago/", description: "Roofing support for commercial buildings, property managers, facilities and multi-unit properties." },
  { title: "Roof Inspections", eyebrow: "Know before you spend", media: "inspection", mediaLabel: "Aerial + visual roof assessment", href: "/roof-inspection-chicago/", description: "A clear assessment of visible roof conditions so you can understand what needs attention now and what can wait." },
];

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "RoofingContractor",
  name: site.name,
  url: site.url,
  telephone: site.phone,
  email: site.email,
  areaServed: ["Chicago", "Chicagoland", "Illinois"],
  description: site.description,
};

export const dynamic = "force-dynamic";

export default async function Home() {
  const reviews = await listPublicReviews();
  const featuredReviews = reviews.slice(0, 3);

  return (
    <main className="roofingHome">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />

      <header className="siteHeader">
        <BrandLogo href="#top" label="Intex Chicago Roofing home" />
        <nav aria-label="Primary navigation">
          <a href="#roofing-services">Roofing</a>
          <a href="/storm-damage-restoration-chicago/">Storm Damage</a>
          <a href="/projects/">Projects</a>
          {featuredReviews.length ? <a href="/reviews/">Reviews</a> : null}
          <a href="/service-areas/">Service Areas</a>
          <a className="navCall" href={`tel:${site.phone}`}>Call {site.phoneDisplay}</a>
        </nav>
      </header>

      <section className="roofHero" id="top">
        <div className="roofHeroBackdrop" aria-hidden="true" />
        <div className="roofHeroContent">
          <p className="roofEyebrow">Chicago roofing specialists</p>
          <h1>Chicago roofs take a beating. <em>We build them to fight back.</em></h1>
          <p className="roofHeroLead">Roof repair, replacement, storm damage and commercial roofing for homeowners and property owners across Chicago and Chicagoland.</p>
          <div className="heroActions">
            <a className="primaryButton" href="/estimate/">Get a roofing estimate</a>
            <a className="secondaryButton" href={`tel:${site.phone}`}>Call {site.phoneDisplay}</a>
          </div>
          <div className="roofTrustStrip" aria-label="Roofing specialties">
            <span>Roof repair</span><span>Roof replacement</span><span>Storm damage</span><span>Flat roofing</span><span>Commercial roofing</span>
          </div>
        </div>

        <div className="roofHeroPanel realRoofHero" aria-label="Professional roofing crew installing a residential roof">
          <div className="heroPhoto" aria-hidden="true" />
          <div className="roofPanelTop"><span>INTEX ROOFING CREW</span><b>CHICAGO</b></div>
          <div className="realRoofBadge">INTEX RESTORATION · PROTECTED</div>
          <div className="roofPanelBottom"><strong>Built on the roof. Proven in the weather.</strong><span>Inspect · repair · replace</span></div>
        </div>
      </section>

      <section className="roofProofBar">
        <p>Roofing-first expertise for Chicago properties.</p>
        <div><span>Residential</span><span>Commercial</span><span>Multifamily</span><span>Chicagoland</span></div>
      </section>

      <section className="roofServices" id="roofing-services">
        <div className="roofSectionHeading">
          <div><p className="roofEyebrow dark">Roofing, not generic contracting</p><h2>Six services. Six different jobsites.</h2></div>
          <p>Every service is shown through the actual material, roof type and work involved—shingles, flashing, membrane, storm damage, commercial systems and inspections.</p>
        </div>
        <div className="roofServiceGrid">
          {roofingServices.map((service, index) => (
            <a className="roofServiceCard" href={service.href} key={service.title}>
              <div className="roofServiceMeta"><span>0{index + 1}</span><small>{service.eyebrow}</small></div>
              <div className={`roofServiceMedia media-${service.media}`} aria-hidden="true"><span className="roofMediaLabel">{service.mediaLabel}</span></div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <b>Explore →</b>
            </a>
          ))}
        </div>
      </section>

      <section className="roofChicagoSection">
        <div className="roofChicagoCopy">
          <p className="roofEyebrow">Designed around Chicago</p>
          <h2>Your roof is a climate system, not just shingles.</h2>
          <p>Chicago roofing has to handle heat, hail, wind, heavy rain, snow loads and repeated freeze-thaw cycles. Our roofing experience and recommendations are framed around those conditions—not a one-size-fits-all national script.</p>
          <a href="/roofing-chicago/">Explore Chicago roofing services →</a>
        </div>
        <div className="roofClimateGrid" aria-label="Chicago roofing conditions">
          <article><strong>WIND</strong><span>Lifted edges, flashing stress and shingle vulnerability</span></article>
          <article><strong>HAIL</strong><span>Granule loss, impact marks and hidden wear</span></article>
          <article><strong>SNOW</strong><span>Snow load, drainage and ice buildup at edges</span></article>
          <article><strong>FREEZE</strong><span>Expansion, contraction and membrane leak paths</span></article>
        </div>
      </section>

      <section className="roofProcessSection">
        <div className="roofSectionHeading lightText">
          <div><p className="roofEyebrow">A simpler roofing process</p><h2>No contractor maze. Just clear next steps.</h2></div>
          <p>Leading roofing companies win trust by making the process understandable. Intex should do the same—from the first inspection through the final walkthrough.</p>
        </div>
        <div className="roofProcessGrid">
          <article><div className="processMotion processInspect" aria-hidden="true"><i /><b /></div><span>01</span><h3>Inspect</h3><p>Understand the condition, urgency and source of the problem.</p></article>
          <article><div className="processMotion processExplain" aria-hidden="true"><i /></div><span>02</span><h3>Explain</h3><p>Separate what needs repair now from what can wait or be planned.</p></article>
          <article><div className="processMotion processBuild" aria-hidden="true"><i /></div><span>03</span><h3>Build</h3><p>Complete the roofing scope with clear communication and documentation.</p></article>
          <article><div className="processMotion processVerify" aria-hidden="true"><i /><b /></div><span>04</span><h3>Verify</h3><p>Review the completed work and leave the property protected.</p></article>
        </div>
      </section>

      {featuredReviews.length ? (
        <section className="homeReviewsSection" aria-labelledby="homeReviewsTitle">
          <div className="sectionHeading">
            <div><p className="kicker dark"><span /> Verified customer feedback</p><h2 id="homeReviewsTitle">Trust should be visible.</h2></div>
            <p>Only reviews with a verified source and confirmed permission to display are shown on the Intex platform.</p>
          </div>
          <div className="reviewGrid">
            {featuredReviews.map((review) => (
              <article className="reviewCard" key={review.id}>
                <div className="reviewCardTop"><span>{review.source}</span>{review.rating > 0 ? <strong>{review.rating.toFixed(1)} / 5</strong> : null}</div>
                <blockquote>“{review.text}”</blockquote>
                <footer><b>{review.reviewerName}</b>{review.publishedAt ? <time dateTime={review.publishedAt}>{review.publishedAt}</time> : null}</footer>
              </article>
            ))}
          </div>
          <a className="homeReviewsLink" href="/reviews/">View verified reviews →</a>
        </section>
      ) : null}

      <section className="roofEstimateSection">
        <div><p className="roofEyebrow dark">Start with the roof</p><h2>Need a repair, replacement or inspection?</h2><p>Tell us what you are seeing and where the property is located. We will help you choose the right next step.</p></div>
        <div className="estimateActions"><a className="primaryButton" href="/estimate/">Request an estimate</a><a className="roofPhoneLink" href={`tel:${site.phone}`}>{site.phoneDisplay} ↗</a></div>
      </section>

      <footer>
        <BrandLogo href="/" label="Intex Chicago Roofing home" className="footerBrand" />
        <p><a href="/roof-repair-chicago/">Roof Repair</a> · <a href="/roof-replacement-chicago/">Roof Replacement</a> · <a href="/flat-roofing-chicago/">Flat Roofing</a> · <a href="/commercial-roofing-chicago/">Commercial Roofing</a> · <a href="/service-areas/">Service Areas</a> · <a href="/contact/">Contact</a></p>
        <p><a href={`mailto:${site.email}`}>{site.email}</a> · <a href={`tel:${site.phone}`}>{site.phoneDisplay}</a></p>
      </footer>
    </main>
  );
}
