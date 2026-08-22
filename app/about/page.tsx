import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Intex Restoration",
  description: "Learn how Intex Restoration approaches roofing and property restoration for homes and businesses in Chicagoland.",
  alternates: { canonical: "/about/" },
};

export default function AboutPage() {
  return (
    <main className="platformPage">
      <section className="platformHero">
        <div className="platformBreadcrumbs"><a href="/">Home</a> / About</div>
        <p className="kicker"><span /> About Intex</p>
        <h1>Property restoration with one accountable team.</h1>
        <p>Intex Restoration serves residential and commercial properties across Chicago and Chicagoland with roofing and restoration support. The new platform is being built around clearer communication, useful project information, and faster paths to the right service.</p>
      </section>

      <section className="platformSection platformSplit">
        <div>
          <p className="kicker dark"><span /> How we work</p>
          <h2>Start with the property problem, not a maze of pages.</h2>
        </div>
        <ul className="platformList">
          <li>Roofing and storm-related property needs</li>
          <li>Water, fire, smoke, and mold restoration</li>
          <li>Residential and commercial properties</li>
          <li>Insurance-claim documentation support</li>
        </ul>
      </section>

      <section className="platformSection">
        <div className="platformEmpty">
          <span>Verification-first migration</span>
          <h2>Only verified business claims move into the new platform.</h2>
          <p>The legacy site contains claims about response times, guarantees, ratings, licensing, and years in business. Those claims are being reviewed before they are promoted in the new experience or included in structured data.</p>
          <div className="heroActions">
            <a className="primaryButton light" href={`tel:${site.phone}`}>Call {site.phoneDisplay}</a>
            <a className="textLink" href="/estimate/">Request help →</a>
          </div>
        </div>
      </section>
    </main>
  );
}
