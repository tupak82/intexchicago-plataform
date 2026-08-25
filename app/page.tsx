import "./roofing-realism.css";
import { BrandLogo } from "@/components/BrandLogo";
import { ServiceCardAnimation } from "@/components/ServiceCardAnimation";
import { site } from "@/lib/site";
import { listPublicReviews } from "@/lib/review-store";
import { listPublicProjects } from "@/lib/project-store";

const roofingServices = [
  { title: "Roof Repair", eyebrow: "Leaks + damage", media: "repair" as const, href: "/roof-repair-chicago/", description: "Targeted repairs for active leaks, flashing failures, missing shingles, punctures and weather-related damage." },
  { title: "Roof Replacement", eyebrow: "Full roofing systems", media: "replacement" as const, href: "/roof-replacement-chicago/", description: "Complete roof replacement for aging or heavily damaged systems, with clear material and scope options." },
  { title: "Storm Damage", eyebrow: "Wind + hail response", media: "storm" as const, href: "/storm-damage-restoration-chicago/", description: "Inspection, temporary protection and repair planning after hail, wind and severe Chicagoland weather." },
  { title: "Flat Roofing", eyebrow: "Low-slope expertise", media: "flat" as const, href: "/flat-roofing-chicago/", description: "Flat and low-slope roofing solutions for Chicago homes, multifamily buildings and commercial properties." },
  { title: "Commercial Roofing", eyebrow: "Protect your property", media: "commercial" as const, href: "/commercial-roofing-chicago/", description: "Roofing for commercial buildings, property managers, facilities and multi-unit properties." },
  { title: "Roof Inspections", eyebrow: "Know what is wrong", media: "inspection" as const, href: "/roof-inspection-chicago/", description: "A clear roof assessment that identifies visible problems, likely causes and the next practical step." },
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
  const [reviews, projects] = await Promise.all([listPublicReviews(), listPublicProjects()]);
  const featuredReviews = reviews.slice(0, 3);
  const featuredProject = projects.find((project) => project.beforeImage && project.afterImage) || null;

  return (
    <main className="roofingHome">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />

      <header className="siteHeader">
        <BrandLogo href="#top" label="Intex Chicago Roofing home" />
        <nav aria-label="Primary navigation">
          <a href="#roofing-services">Roofing</a>
          <a href="/restoration/">Restoration</a>
          <a href="/projects/">Projects</a>
          <a href="/service-areas/">Service Areas</a>
          <a href="/contact/">Contact</a>
          <a className="navCall" href={`tel:${site.phone}`}>Call {site.phoneDisplay}</a>
        </nav>
      </header>

      <section className="roofHero" id="top">
        <div className="roofHeroBackdrop" aria-hidden="true" />
        <div className="roofHeroContent">
          <p className="roofEyebrow">Chicago roofing contractor</p>
          <h1>Roof repair and replacement <em>built for Chicago weather.</em></h1>
          <p className="roofHeroLead">Intex Chicago helps homeowners, property managers and commercial property owners with roof repairs, replacements, inspections, flat roofing and storm damage across Chicago and Chicagoland.</p>
          <div className="heroActions">
            <a className="primaryButton" href="/estimate/">Request a roofing estimate</a>
            <a className="secondaryButton" href={`tel:${site.phone}`}>Call {site.phoneDisplay}</a>
          </div>
          <div className="roofTrustStrip" aria-label="Roofing specialties">
            <span>Roof repair</span><span>Roof replacement</span><span>Storm damage</span><span>Flat roofing</span><span>Commercial roofing</span>
          </div>
        </div>

        <div className="roofHeroPanel realRoofHero" aria-label="Professional roofing crew installing a residential roof">
          <div className="heroPhoto" aria-hidden="true" />
          <div className="roofPanelTop"><span>INTEX ROOFING</span><b>CHICAGO</b></div>
          <div className="realRoofBadge">ROOFING · REPAIR · RESTORATION</div>
          <div className="roofPanelBottom"><strong>Inspect. Repair. Replace.</strong><span>Residential · commercial · multifamily</span></div>
        </div>
      </section>

      <section className="roofProofBar">
        <p>Roofing services for Chicago homes and properties.</p>
        <div><span>Residential</span><span>Commercial</span><span>Multifamily</span><span>Chicagoland</span></div>
      </section>

      <section className="fieldTrustRail" aria-label="Why property owners call Intex">
        <article><span>01</span><div><strong>Roof inspections</strong><small>We start by identifying the visible condition and likely source of the problem.</small></div></article>
        <article><span>02</span><div><strong>Clear repair scope</strong><small>You should know what needs repair, what can wait and what replacement would involve.</small></div></article>
        <article><span>03</span><div><strong>Chicago roof systems</strong><small>Shingle, flat, low-slope, multifamily and commercial roofing.</small></div></article>
        <article><span>04</span><div><strong>Storm damage response</strong><small>Support after wind, hail, snow, ice and other severe weather.</small></div></article>
      </section>

      <section className="roofServices" id="roofing-services">
        <div className="roofSectionHeading">
          <div><p className="roofEyebrow dark">Roofing services</p><h2>What do you need help with?</h2></div>
          <p>Choose the service that matches the problem you are seeing. If you are not sure, start with a roof inspection.</p>
        </div>
        <div className="roofServiceGrid">
          {roofingServices.map((service, index) => (
            <a className="roofServiceCard" href={service.href} key={service.title}>
              <div className="roofServiceMeta"><span>0{index + 1}</span><small>{service.eyebrow}</small></div>
              <div className="roofServiceMedia"><ServiceCardAnimation type={service.media} /></div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <b>View service →</b>
            </a>
          ))}
        </div>
      </section>

      <section className="roofChicagoSection">
        <div className="roofChicagoCopy">
          <p className="roofEyebrow">Roofing in Chicago</p>
          <h2>Chicago weather is hard on roofs.</h2>
          <p>Wind can lift shingles and stress flashing. Hail can damage roof surfaces and exposed metal. Snow and ice can expose drainage problems, weak edges and vulnerable penetrations. A proper inspection looks at the roof system as a whole and helps determine whether the right next step is repair, maintenance or replacement.</p>
          <a href="/roofing-chicago/">Learn about roofing in Chicago →</a>
        </div>
        <div className="roofClimateGrid" aria-label="Common Chicago roofing problems">
          <article><strong>WIND</strong><span>Lifted shingles, loose edges and flashing failures.</span></article>
          <article><strong>HAIL</strong><span>Impact damage to shingles, vents, gutters and exposed metal.</span></article>
          <article><strong>SNOW</strong><span>Added load, blocked drainage and water backup around vulnerable areas.</span></article>
          <article><strong>ICE</strong><span>Freeze-thaw cycles and ice buildup can force water into weak roof details.</span></article>
        </div>
      </section>

      {featuredProject ? (
        <section className="featuredRoofProject" aria-labelledby="featuredProjectTitle">
          <div className="featuredProjectCopy">
            <p className="roofEyebrow dark">Recent Intex work</p>
            <h2 id="featuredProjectTitle">See the problem. See the finished roof.</h2>
            <p>{featuredProject.summary}</p>
            <div className="projectFacts"><span>{featuredProject.service}</span><span>{featuredProject.propertyType}</span><span>{featuredProject.location}</span></div>
            <a href={`/projects/${featuredProject.slug}/`}>View project details →</a>
          </div>
          <div className="beforeAfterProof">
            <figure><div className="proofImageFrame"><img src={featuredProject.beforeImage} alt={`Before: ${featuredProject.title}`} /></div><figcaption><b>BEFORE</b><span>{featuredProject.problem}</span></figcaption></figure>
            <figure><div className="proofImageFrame"><img src={featuredProject.afterImage} alt={`After: ${featuredProject.title}`} /></div><figcaption><b>AFTER</b><span>{featuredProject.outcome}</span></figcaption></figure>
          </div>
        </section>
      ) : (
        <section className="projectProofPlaceholder">
          <div><p className="roofEyebrow dark">Project gallery</p><h2>See completed roofing work.</h2></div>
          <p>Visit the project section for documented roofing and restoration work as verified project photography is added to the platform.</p>
          <a href="/projects/">View projects →</a>
        </section>
      )}

      <section className="roofProcessSection">
        <div className="roofSectionHeading lightText">
          <div><p className="roofEyebrow">How it works</p><h2>A straightforward roofing process.</h2></div>
          <p>We inspect the roof, explain what we found, define the scope, complete the work and review the finished result with you.</p>
        </div>
        <div className="roofProcessGrid">
          <article><div className="processMotion processInspect" aria-hidden="true"><i /><b /></div><span>01</span><h3>Inspect</h3><p>Look at the roof condition, damage and likely source of the problem.</p></article>
          <article><div className="processMotion processExplain" aria-hidden="true"><i /></div><span>02</span><h3>Scope</h3><p>Explain the recommended repair or replacement and what the work includes.</p></article>
          <article><div className="processMotion processBuild" aria-hidden="true"><i /></div><span>03</span><h3>Roof</h3><p>Complete the approved roofing work with clear communication during the job.</p></article>
          <article><div className="processMotion processVerify" aria-hidden="true"><i /><b /></div><span>04</span><h3>Final review</h3><p>Review the completed work and make sure the property is left protected.</p></article>
        </div>
      </section>

      {featuredReviews.length ? (
        <section className="homeReviewsSection" aria-labelledby="homeReviewsTitle">
          <div className="sectionHeading">
            <div><p className="kicker dark"><span /> Customer reviews</p><h2 id="homeReviewsTitle">What customers say about Intex.</h2></div>
            <p>Verified customer feedback displayed from approved review sources.</p>
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
          <a className="homeReviewsLink" href="/reviews/">View all reviews →</a>
        </section>
      ) : null}

      <section className="roofEstimateSection">
        <div><p className="roofEyebrow dark">Request an estimate</p><h2>Need a roof repair, replacement or inspection?</h2><p>Tell us what is happening with the roof and where the property is located. We will help you determine the right next step.</p></div>
        <div className="estimateActions"><a className="primaryButton" href="/estimate/">Request a roofing estimate</a><a className="roofPhoneLink" href={`tel:${site.phone}`}>{site.phoneDisplay} ↗</a></div>
      </section>

      <footer className="siteFooter homeSiteFooter">
        <div className="siteFooterBrand">
          <BrandLogo href="/" label="Intex Chicago home" className="footerBrand" />
          <p>Roofing and property restoration for Chicago and Chicagoland.</p>
        </div>
        <div className="siteFooterLinks">
          <div>
            <strong>Roofing</strong>
            <a href="/roof-repair-chicago/">Roof Repair</a>
            <a href="/roof-replacement-chicago/">Roof Replacement</a>
            <a href="/flat-roofing-chicago/">Flat Roofing</a>
            <a href="/commercial-roofing-chicago/">Commercial Roofing</a>
          </div>
          <div>
            <strong>Restoration</strong>
            <a href="/restoration/">All Restoration Services</a>
            <a href="/water-damage-restoration-chicago/">Water Damage</a>
            <a href="/fire-damage-restoration-chicago/">Fire & Smoke</a>
            <a href="/mold-remediation-chicago/">Mold Remediation</a>
            <a href="/commercial-restoration-chicago/">Commercial Restoration</a>
          </div>
          <div>
            <strong>Intex</strong>
            <a href="/about/">About</a>
            <a href="/projects/">Projects</a>
            <a href="/service-areas/">Service Areas</a>
            <a href="/resources/">Resources</a>
            <a href="/contact/">Contact</a>
          </div>
        </div>
        <div className="siteFooterContact">
          <a href={`tel:${site.phone}`}>{site.phoneDisplay}</a>
          <a href={`mailto:${site.email}`}>{site.email}</a>
          <a href="/estimate/">Start a request →</a>
        </div>
      </footer>
    </main>
  );
}
