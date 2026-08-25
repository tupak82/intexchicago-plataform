import "./roofing-realism.css";
import { BrandLogo } from "@/components/BrandLogo";
import { ServiceCardAnimation } from "@/components/ServiceCardAnimation";
import { site } from "@/lib/site";
import { listPublicReviews } from "@/lib/review-store";
import { listPublicProjects } from "@/lib/project-store";

const roofingServices = [
  { title: "Roof Repair", eyebrow: "Leaks + damage", media: "repair" as const, href: "/roof-repair-chicago/", description: "Targeted repairs for leaks, flashing failures, missing shingles, punctures and weather-related damage." },
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
          <a href="#roofing-services">Roofing Services</a>
          <a href="/storm-damage-restoration-chicago/">Storm Damage</a>
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
          <h1>Roof repair, replacement and storm damage <em>for Chicago properties.</em></h1>
          <p className="roofHeroLead">Intex Chicago serves homeowners, property managers and commercial property owners across Chicago and Chicagoland with roof repair, roof replacement, inspections, flat roofing and storm damage service.</p>
          <div className="heroActions">
            <a className="primaryButton" href="/estimate/">Request a roofing estimate</a>
            <a className="secondaryButton" href={`tel:${site.phone}`}>Call {site.phoneDisplay}</a>
          </div>
          <div className="roofTrustStrip" aria-label="Roofing specialties">
            <span>Residential roofing</span><span>Commercial roofing</span><span>Flat roofs</span><span>Storm damage</span>
          </div>
        </div>

        <div className="roofHeroPanel realRoofHero" aria-label="Professional roofing crew installing a residential roof">
          <div className="heroPhoto" aria-hidden="true" />
          <div className="roofPanelTop"><span>INTEX ROOFING</span><b>CHICAGO</b></div>
          <div className="realRoofBadge">ROOFING · REPAIR · RESTORATION</div>
          <div className="roofPanelBottom"><strong>Inspect. Repair. Replace.</strong><span>Residential · commercial · multifamily</span></div>
        </div>
      </section>

      <section className="roofProblemStrip" aria-label="Common roofing needs">
        <a href="/roof-repair-chicago/"><small>Roof leaking?</small><strong>Repair a leak</strong><span>Leaks, flashing, missing shingles and localized damage.</span></a>
        <a href="/roof-replacement-chicago/"><small>Roof worn out?</small><strong>Replace a roof</strong><span>Plan a complete replacement for an aging roofing system.</span></a>
        <a href="/storm-damage-restoration-chicago/"><small>After a storm?</small><strong>Check storm damage</strong><span>Wind, hail and weather-related roof concerns.</span></a>
        <a href="/roof-inspection-chicago/"><small>Not sure?</small><strong>Start with an inspection</strong><span>Understand the condition before choosing the next step.</span></a>
      </section>

      <section className="roofServices roofServicesCore" id="roofing-services">
        <div className="roofSectionHeading">
          <div><p className="roofEyebrow dark">Roofing services</p><h2>Roofing help for the problem in front of you.</h2></div>
          <p>Start with the service that matches what you are seeing. If the cause is unclear, begin with a roof inspection.</p>
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

      <section className="roofStormCore">
        <div className="roofStormCopy">
          <p className="roofEyebrow">Storm damage roofing</p>
          <h2>Wind or hail hit your roof?</h2>
          <p>Storm damage is not always obvious from the ground. If you see missing shingles, loose materials, active leaks or new damage after severe weather, schedule a roof inspection and document what is visible before repairs begin.</p>
          <a href="/storm-damage-restoration-chicago/">Storm damage roofing →</a>
        </div>
        <div className="roofStormVisual" aria-hidden="true" />
      </section>

      <section className="roofProofCore">
        {featuredProject ? (
          <div className="featuredRoofProject" aria-labelledby="featuredProjectTitle">
            <div className="featuredProjectCopy">
              <p className="roofEyebrow dark">Recent Intex work</p>
              <h2 id="featuredProjectTitle">See the condition before. See the finished work after.</h2>
              <p>{featuredProject.summary}</p>
              <div className="projectFacts"><span>{featuredProject.service}</span><span>{featuredProject.propertyType}</span><span>{featuredProject.location}</span></div>
              <a href={`/projects/${featuredProject.slug}/`}>View project details →</a>
            </div>
            <div className="beforeAfterProof">
              <figure><div className="proofImageFrame"><img src={featuredProject.beforeImage} alt={`Before: ${featuredProject.title}`} /></div><figcaption><b>BEFORE</b><span>{featuredProject.problem}</span></figcaption></figure>
              <figure><div className="proofImageFrame"><img src={featuredProject.afterImage} alt={`After: ${featuredProject.title}`} /></div><figcaption><b>AFTER</b><span>{featuredProject.outcome}</span></figcaption></figure>
            </div>
          </div>
        ) : (
          <div className="projectProofPlaceholder">
            <div><p className="roofEyebrow dark">Project gallery</p><h2>See completed roofing work.</h2></div>
            <p>Visit the project section for documented roofing and restoration work as verified project photography is added to the platform.</p>
            <a href="/projects/">View projects →</a>
          </div>
        )}
      </section>

      <section className="roofProcessCore">
        <div className="roofSectionHeading lightText">
          <div><p className="roofEyebrow">How it works</p><h2>A simple roofing process.</h2></div>
          <p>Inspect the condition, define the scope, complete the approved roofing work and review the finished result.</p>
        </div>
        <div className="roofProcessGrid">
          <article><div className="processMotion processInspect" aria-hidden="true"><i /><b /></div><span>01</span><h3>Inspect</h3><p>Look at the roof condition, damage and likely source of the problem.</p></article>
          <article><div className="processMotion processExplain" aria-hidden="true"><i /></div><span>02</span><h3>Scope</h3><p>Explain the recommended repair or replacement and what the work includes.</p></article>
          <article><div className="processMotion processBuild" aria-hidden="true"><i /></div><span>03</span><h3>Complete the work</h3><p>Carry out the approved roofing scope with communication during the job.</p></article>
          <article><div className="processMotion processVerify" aria-hidden="true"><i /><b /></div><span>04</span><h3>Final review</h3><p>Review the completed work and confirm the property is left protected.</p></article>
        </div>
      </section>

      <section className="roofLocalCore">
        <div>
          <p className="roofEyebrow dark">Roofing in Chicago</p>
          <h2>Local roof types. Local weather problems.</h2>
          <p>Chicago properties include pitched shingle roofs, flat and low-slope systems, multifamily buildings and commercial roofs. The right repair depends on the roof type, drainage, penetrations, flashing and the actual source of the failure—not just what is visible inside.</p>
          <a href="/roofing-chicago/">Explore Chicago roofing →</a>
        </div>
        <div className="roofLocalList">
          <article><strong>Shingle roofs</strong><span>Leaks, lifted shingles, flashing failures, aging materials and storm damage.</span></article>
          <article><strong>Flat + low-slope</strong><span>Membrane condition, seams, penetrations, drainage and standing-water concerns.</span></article>
          <article><strong>Multifamily</strong><span>Roofing work that accounts for occupied buildings, shared systems and property management needs.</span></article>
          <article><strong>Commercial</strong><span>Inspection, repair and replacement planning for larger roof areas and operating properties.</span></article>
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
            <strong>Storm + Restoration</strong>
            <a href="/storm-damage-restoration-chicago/">Storm Damage</a>
            <a href="/restoration/">Property Restoration</a>
            <a href="/water-damage-restoration-chicago/">Water Damage</a>
            <a href="/fire-damage-restoration-chicago/">Fire & Smoke</a>
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
