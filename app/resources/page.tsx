import type { Metadata } from "next";
import { publishedResources } from "@/lib/resources";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Roofing & Restoration Resources",
  description: "Practical roofing, restoration, emergency, and insurance-claim guides for Chicago property owners.",
  alternates: { canonical: "/resources/" },
};

export default function ResourcesPage() {
  return (
    <main className="platformPage">
      <section className="platformHero compact">
        <div className="platformBreadcrumbs"><a href="/">Home</a> / Resources</div>
        <p className="kicker"><span /> Roofing + restoration guides</p>
        <h1>Know what to look for before the problem gets more expensive.</h1>
        <p>Practical guidance for leaks, hail, roof damage, water intrusion, emergency documentation and the decisions Chicago property owners often need to make quickly.</p>
        <div className="heroActions">
          <a className="primaryButton" href="/estimate/">Request help with a property issue</a>
          <a className="secondaryButton" href={`tel:${site.phone}`}>Call {site.phoneDisplay}</a>
        </div>
      </section>

      <section className="platformSection platformSplit">
        <div>
          <p className="kicker dark"><span /> Start with the situation</p>
          <h2>Use the guides to understand the problem. Use Intex when the property needs action.</h2>
        </div>
        <ul className="platformList">
          <li><a href="/storm-damage-restoration-chicago/">Storm or hail damage →</a></li>
          <li><a href="/roof-repair-chicago/">Active roof leak or repair →</a></li>
          <li><a href="/roof-inspection-chicago/">Unsure whether the roof is damaged →</a></li>
          <li><a href="/insurance-claims/">Need documentation for an insurance claim →</a></li>
        </ul>
      </section>

      <section className="platformSection">
        <div className="sectionHeading">
          <div>
            <p className="kicker dark"><span /> Resource library</p>
            <h2>Read the guide that matches what is happening now.</h2>
          </div>
          <p>Each article is written to help you identify the next sensible step without turning every roofing or restoration question into a sales pitch.</p>
        </div>
        <div className="platformGrid">
          {publishedResources.map((article) => (
            <a className="platformCard" href={`/resources/${article.slug}/`} key={article.slug}>
              <span>{article.category}</span>
              <h2>{article.title}</h2>
              <p>{article.description}</p>
              <b>Read guide →</b>
            </a>
          ))}
        </div>
      </section>
    </main>
  );
}
