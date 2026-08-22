import type { Metadata } from "next";
import { serviceAreas } from "@/lib/service-areas";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Roofing Service Areas in Chicago & Chicagoland",
  description: "Explore Intex Chicago roofing coverage for roof repair, replacement, flat roofing, commercial roofing and storm damage across Chicago and nearby suburbs.",
  alternates: { canonical: "/service-areas/" },
};

export default function ServiceAreasPage() {
  const publishedAreas = serviceAreas.filter((area) => area.indexable);

  return (
    <main className="platformPage">
      <section className="platformHero">
        <div className="platformBreadcrumbs"><a href="/">Home</a> / Service Areas</div>
        <p className="kicker"><span /> Chicago + Chicagoland roofing</p>
        <h1>Local roofing coverage built around real service areas.</h1>
        <p>Intex provides roofing support across Chicago and selected Chicagoland communities. Each area page connects homeowners and property owners directly to roof repair, replacement, flat roofing, commercial roofing, inspections and storm-damage help.</p>
        <div className="heroActions">
          <a className="primaryButton" href="/estimate/?service=roofing">Request a roofing estimate</a>
          <a className="secondaryButton" href={`tel:${site.phone}`}>Call {site.phoneDisplay}</a>
        </div>
      </section>

      <section className="platformSection">
        <div className="sectionHeading">
          <div>
            <p className="kicker dark"><span /> Service areas</p>
            <h2>Find roofing help near your property.</h2>
          </div>
          <p>We publish location pages only where the platform has useful, differentiated roofing content. The goal is local relevance—not hundreds of duplicated SEO pages.</p>
        </div>
        <div className="platformGrid">
          {publishedAreas.map((area) => (
            <a className="platformCard" href={`/service-areas/${area.slug}/`} key={area.slug}>
              <span>Roofing service area</span>
              <h2>{area.name}</h2>
              <p>{area.description}</p>
              <b>Explore roofing in {area.name} →</b>
            </a>
          ))}
        </div>
      </section>

      <section className="platformSection platformSplit">
        <div>
          <p className="kicker dark"><span /> Core roofing services</p>
          <h2>One roofing system, multiple local entry points.</h2>
        </div>
        <ul className="platformList">
          <li><a href="/roof-repair-chicago/">Roof Repair</a></li>
          <li><a href="/roof-replacement-chicago/">Roof Replacement</a></li>
          <li><a href="/flat-roofing-chicago/">Flat Roofing</a></li>
          <li><a href="/commercial-roofing-chicago/">Commercial Roofing</a></li>
          <li><a href="/roof-inspection-chicago/">Roof Inspections</a></li>
          <li><a href="/storm-damage-restoration-chicago/">Storm Damage Roofing</a></li>
        </ul>
      </section>
    </main>
  );
}
