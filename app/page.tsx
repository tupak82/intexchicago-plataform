import "./roofing-realism.css";
import { BrandLogo } from "@/components/BrandLogo";
import { ServiceCardAnimation } from "@/components/ServiceCardAnimation";
import { site } from "@/lib/site";
import { listPublicReviews } from "@/lib/review-store";
import { listPublicProjects } from "@/lib/project-store";

const roofingServices = [
  { title: "Roof Repair", label: "Leaks · flashing · storm damage", media: "repair" as const, href: "/roof-repair-chicago/", className: "serviceFeature" },
  { title: "Roof Replacement", label: "Tear-off · system rebuild · materials", media: "replacement" as const, href: "/roof-replacement-chicago/", className: "serviceWide" },
  { title: "Storm Damage", label: "Wind · hail · emergency protection", media: "storm" as const, href: "/storm-damage-restoration-chicago/", className: "serviceTall" },
  { title: "Flat Roofing", label: "TPO · membrane · drainage", media: "flat" as const, href: "/flat-roofing-chicago/", className: "serviceCompact" },
  { title: "Commercial Roofing", label: "Facilities · multifamily · operations", media: "commercial" as const, href: "/commercial-roofing-chicago/", className: "serviceCompact" },
  { title: "Roof Inspection", label: "Condition · damage · next step", media: "inspection" as const, href: "/roof-inspection-chicago/", className: "serviceWide" },
];

const restorationServices = [
  ["Water Damage", "/water-damage-restoration-chicago/"],
  ["Fire + Smoke", "/fire-damage-restoration-chicago/"],
  ["Mold", "/mold-remediation-chicago/"],
  ["Commercial Restoration", "/commercial-restoration-chicago/"],
  ["Insurance Claims", "/insurance-claims/"],
] as const;

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
    <main className="roofingHome roofingHomeV2">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />

      <header className="roofTopbar">
        <BrandLogo href="#top" label="Intex Chicago Roofing home" />
        <nav aria-label="Primary navigation">
          <a href="#services">Roofing</a>
          <a href="/storm-damage-restoration-chicago/">Storm Damage</a>
          <a href="/projects/">Projects</a>
          <a href="/service-areas/">Service Areas</a>
          <a href="/contact/">Contact</a>
        </nav>
        <a className="roofTopCall" href={`tel:${site.phone}`}>Call {site.phoneDisplay}</a>
      </header>

      <section className="roofHeroV2" id="top">
        <div className="roofHeroV2Media" aria-hidden="true"><span className="roofHeroSweep" /></div>
        <div className="roofHeroV2Overlay" />
        <div className="roofHeroV2Content">
          <p className="roofMicro">ROOFING · CHICAGO + CHICAGOLAND</p>
          <h1>Built for the roof.<br/><em>Ready for Chicago.</em></h1>
          <p>Roof repair, replacement, storm damage, flat roofing and commercial roofing for Chicago properties.</p>
          <div className="roofHeroV2Actions">
            <a className="roofActionPrimary" href="/estimate/">Request an estimate</a>
            <a className="roofActionGhost" href={`tel:${site.phone}`}>Call now <span>↗</span></a>
          </div>
        </div>
        <div className="roofHeroV2Status">
          <span>RESIDENTIAL</span><span>COMMERCIAL</span><span>MULTIFAMILY</span><span>STORM</span>
        </div>
        <div className="roofHeroV2Caption">
          <small>INTEX CHICAGO</small>
          <strong>Inspect · repair · replace</strong>
        </div>
      </section>

      <section className="roofFastPath" aria-label="Choose your roofing need">
        <a href="/roof-repair-chicago/"><span>01</span><div><small>ACTIVE PROBLEM</small><strong>Roof leaking?</strong></div><b>Repair →</b></a>
        <a href="/roof-replacement-chicago/"><span>02</span><div><small>AGING SYSTEM</small><strong>Time for a new roof?</strong></div><b>Replace →</b></a>
        <a href="/storm-damage-restoration-chicago/"><span>03</span><div><small>AFTER SEVERE WEATHER</small><strong>Wind or hail?</strong></div><b>Inspect →</b></a>
      </section>

      <section className="roofServicesV2" id="services">
        <div className="roofEditorialHeading">
          <div><p className="roofMicro dark">ROOFING SERVICES</p><h2>Different roof problem.<br/>Different jobsite.</h2></div>
          <p>Repair is not replacement. Flat roofing is not shingles. Storm damage is not routine maintenance. Each service starts with the roof system in front of us.</p>
        </div>
        <div className="roofBento">
          {roofingServices.map((service, index) => (
            <a className={`roofBentoCard ${service.className}`} href={service.href} key={service.title}>
              <div className="roofBentoVisual"><ServiceCardAnimation type={service.media} /></div>
              <div className="roofBentoShade" />
              <div className="roofBentoCopy">
                <span>0{index + 1}</span>
                <small>{service.label}</small>
                <h3>{service.title}</h3>
                <b>Explore service ↗</b>
              </div>
            </a>
          ))}
        </div>
      </section>

      <section className="roofDamageStory">
        <div className="roofStoryIntro">
          <p className="roofMicro">FROM DAMAGE TO A FINISHED ROOF</p>
          <h2>See the problem.<br/>Build the response.</h2>
        </div>
        <div className="roofStorySteps">
          <article className="storyDamage"><span>01</span><div><small>DAMAGE</small><h3>Hail. Wind. Leaks. Wear.</h3><p>Start with what changed on the roof—not a generic sales pitch.</p></div></article>
          <article className="storyInspect"><span>02</span><div><small>ASSESS</small><h3>Find the failure point.</h3><p>Roof surface, flashing, penetrations, membrane and drainage all tell part of the story.</p></div></article>
          <article className="storyRestore"><span>03</span><div><small>RESTORE</small><h3>Repair what failed.</h3><p>Targeted repair or complete replacement based on the condition of the roofing system.</p></div></article>
        </div>
      </section>

      <section className="roofChicagoV2">
        <div className="roofChicagoV2Lead">
          <p className="roofMicro dark">CHICAGO ROOF CONDITIONS</p>
          <h2>The weather changes.<br/>The roof has to keep up.</h2>
          <a href="/roofing-chicago/">Chicago roofing guide ↗</a>
        </div>
        <div className="roofWeatherGrid">
          <article className="weatherHail"><span>HAIL</span><strong>Impact + granule loss</strong><small>Storm damage can be difficult to read from the street.</small></article>
          <article className="weatherSnow"><span>SNOW</span><strong>Load + meltwater</strong><small>Edges, drainage and vulnerable details matter through winter.</small></article>
          <article className="weatherIce"><span>ICE DAMS</span><strong>Backup at roof edges</strong><small>Repeated melt and refreeze can push water beneath weak areas.</small></article>
          <article className="weatherFreeze"><span>FREEZE–THAW</span><strong>Movement + stress</strong><small>Flashing, seams and penetrations see repeated seasonal movement.</small></article>
        </div>
      </section>

      <section className="roofWhyV2">
        <div className="roofWhyTitle"><p className="roofMicro">WHY INTEX</p><h2>Roofing decisions should be easier to understand.</h2></div>
        <div className="roofWhyGrid">
          <article><span>01</span><strong>Clear inspection findings</strong><p>Understand the visible condition before choosing the next step.</p></article>
          <article><span>02</span><strong>Roof-specific scope</strong><p>Repair, replacement and material decisions tied to the actual roof system.</p></article>
          <article><span>03</span><strong>Chicago roof types</strong><p>Shingle, flat, multifamily and commercial roofing require different details.</p></article>
          <article><span>04</span><strong>Storm-aware planning</strong><p>Wind, hail, drainage and seasonal exposure are part of the roofing decision.</p></article>
        </div>
      </section>

      <section className="roofProofV2">
        {featuredProject ? (
          <>
            <div className="roofProofV2Copy">
              <p className="roofMicro dark">DOCUMENTED WORK</p>
              <h2>{featuredProject.title}</h2>
              <p>{featuredProject.summary}</p>
              <div className="projectFacts"><span>{featuredProject.service}</span><span>{featuredProject.propertyType}</span><span>{featuredProject.location}</span></div>
              <a href={`/projects/${featuredProject.slug}/`}>View project ↗</a>
            </div>
            <div className="roofProofV2Media">
              <figure><img src={featuredProject.beforeImage} alt={`Before: ${featuredProject.title}`} /><figcaption>BEFORE</figcaption></figure>
              <figure><img src={featuredProject.afterImage} alt={`After: ${featuredProject.title}`} /><figcaption>AFTER</figcaption></figure>
            </div>
          </>
        ) : (
          <>
            <div className="roofProofV2Copy"><p className="roofMicro dark">DOCUMENTED WORK</p><h2>Real projects belong here.</h2><p>Only verified Intex project photography is presented as completed Intex work.</p><a href="/projects/">View projects ↗</a></div>
            <div className="roofProofPlaceholderVisual"><span>BEFORE</span><b>→</b><span>AFTER</span></div>
          </>
        )}
      </section>

      <section className="roofRestorationBand">
        <div className="roofRestorationBandCopy"><p className="roofMicro">BEYOND THE ROOF</p><h2>Property restoration when damage moves inside.</h2><a href="/restoration/">Explore restoration ↗</a></div>
        <div className="roofRestorationLinks">
          {restorationServices.map(([label, href], index) => <a href={href} key={href}><span>0{index + 1}</span><strong>{label}</strong><b>↗</b></a>)}
        </div>
      </section>

      {featuredReviews.length ? (
        <section className="roofReviewsV2" aria-labelledby="roofReviewsTitle">
          <div className="roofEditorialHeading compact"><div><p className="roofMicro dark">VERIFIED REVIEWS</p><h2 id="roofReviewsTitle">What customers say.</h2></div><a href="/reviews/">View all reviews ↗</a></div>
          <div className="roofReviewsGrid">{featuredReviews.map((review) => <article key={review.id}><small>{review.source}</small><blockquote>“{review.text}”</blockquote><footer><b>{review.reviewerName}</b>{review.rating > 0 ? <span>{review.rating.toFixed(1)} / 5</span> : null}</footer></article>)}</div>
        </section>
      ) : null}

      <section className="roofFinalCta">
        <div><p className="roofMicro">START WITH THE ROOF</p><h2>Repair, replace or inspect?</h2><p>Tell Intex what is happening and where the property is located.</p></div>
        <div className="roofFinalActions"><a className="roofActionPrimary light" href="/estimate/">Request an estimate</a><a className="roofActionGhost" href={`tel:${site.phone}`}>{site.phoneDisplay} ↗</a></div>
      </section>

      <footer className="roofFooterV2">
        <div><BrandLogo href="/" label="Intex Chicago home" className="footerBrand" /><p>Roofing + property restoration for Chicago and Chicagoland.</p></div>
        <div><strong>Roofing</strong><a href="/roof-repair-chicago/">Roof Repair</a><a href="/roof-replacement-chicago/">Roof Replacement</a><a href="/flat-roofing-chicago/">Flat Roofing</a><a href="/commercial-roofing-chicago/">Commercial Roofing</a></div>
        <div><strong>Intex</strong><a href="/projects/">Projects</a><a href="/service-areas/">Service Areas</a><a href="/contact/">Contact</a><a href="/restoration/">Restoration</a></div>
        <div className="roofFooterContact"><a href={`tel:${site.phone}`}>{site.phoneDisplay}</a><a href={`mailto:${site.email}`}>{site.email}</a></div>
      </footer>
    </main>
  );
}
