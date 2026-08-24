import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Intex Chicago Roofing",
  description: "Learn how Intex Chicago approaches roofing, storm damage and property restoration for homes and businesses across Chicagoland.",
  alternates: { canonical: "/about/" },
};

const capabilities = [
  {
    label: "Roofing first",
    title: "Built around the roof system.",
    copy: "Repair, replacement, storm damage, flat roofing, commercial roofing and inspection are treated as different problems with different scopes — not as one generic service.",
  },
  {
    label: "Chicago conditions",
    title: "Designed for what happens here.",
    copy: "Freeze-thaw cycles, ice at the eaves, heavy snow, wind and hail all affect how a roof should be inspected, repaired and specified in Chicagoland.",
  },
  {
    label: "Clear next step",
    title: "Start with the property problem.",
    copy: "Whether the issue is a leak, visible storm damage, an aging roof or a planned commercial project, the goal is to identify the right path before work begins.",
  },
] as const;

export default function AboutPage() {
  return (
    <main className="platformPage">
      <section className="platformHero">
        <div className="platformBreadcrumbs"><a href="/">Home</a> / About</div>
        <p className="kicker"><span /> About Intex Chicago</p>
        <h1>Roofing decisions should feel clear, not complicated.</h1>
        <p>Intex Chicago focuses on roofing and property restoration for residential and commercial properties across Chicago and Chicagoland. The experience starts with understanding the building, the failure point and the conditions around it — then choosing the right service for that specific problem.</p>
        <div className="heroActions">
          <a className="primaryButton light" href="/estimate/">Request an estimate</a>
          <a className="textLink" href={`tel:${site.phone}`}>Call {site.phoneDisplay} →</a>
        </div>
      </section>

      <section className="platformSection">
        <p className="kicker dark"><span /> How we think</p>
        <div className="platformGrid">
          {capabilities.map((item) => (
            <article className="platformCard" key={item.label}>
              <span>{item.label}</span>
              <h2>{item.title}</h2>
              <p>{item.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="platformSection platformSplit">
        <div>
          <p className="kicker dark"><span /> Scope</p>
          <h2>From a localized roof problem to a larger restoration need.</h2>
        </div>
        <ul className="platformList">
          <li>Roof repair and roof replacement</li>
          <li>Storm and hail damage roofing</li>
          <li>Flat and commercial roofing systems</li>
          <li>Roof inspections and documentation</li>
          <li>Water, fire, smoke and mold restoration</li>
          <li>Insurance-claim documentation support</li>
        </ul>
      </section>

      <section className="platformSection">
        <div className="platformEmpty">
          <span>Start here</span>
          <h2>Not sure which service matches the problem?</h2>
          <p>Use the guided request flow and describe what you are seeing. You can include the service type, timing and property details so the conversation starts with useful context.</p>
          <div className="heroActions">
            <a className="primaryButton light" href="/estimate/">Start your request</a>
            <a className="textLink" href={`mailto:${site.email}`}>Email {site.email} →</a>
          </div>
        </div>
      </section>
    </main>
  );
}
