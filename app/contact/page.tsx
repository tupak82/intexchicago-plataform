import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact Intex Chicago Roofing",
  description: "Contact Intex Chicago for roofing, storm damage and property restoration help across Chicago and Chicagoland.",
  alternates: { canonical: "/contact/" },
};

const contactOptions = [
  {
    label: "Call",
    title: site.phoneDisplay,
    copy: "Best when you want to talk through the property problem directly.",
    href: `tel:${site.phone}`,
    action: "Call Intex",
  },
  {
    label: "Email",
    title: site.email,
    copy: "Useful for project details, photos, documents or a written follow-up.",
    href: `mailto:${site.email}`,
    action: "Email Intex",
  },
  {
    label: "Guided request",
    title: "Estimate & project intake",
    copy: "Share the service type, property details and timing before the conversation starts.",
    href: "/estimate/",
    action: "Start request",
  },
] as const;

export default function ContactPage() {
  return (
    <main className="platformPage">
      <section className="platformHero compact">
        <div className="platformBreadcrumbs"><a href="/">Home</a> / Contact</div>
        <p className="kicker"><span /> Contact Intex Chicago</p>
        <h1>Start with what you are seeing at the property.</h1>
        <p>A leak, hail marks, missing shingles, an aging roof, flat-roof drainage or a larger restoration issue — choose the contact path that gives you the fastest way to explain the problem clearly.</p>
      </section>

      <section className="platformSection">
        <p className="kicker dark"><span /> Three ways to start</p>
        <div className="platformGrid">
          {contactOptions.map((option) => (
            <a className="platformCard" href={option.href} key={option.label}>
              <span>{option.label}</span>
              <h2>{option.title}</h2>
              <p>{option.copy}</p>
              <b>{option.action} →</b>
            </a>
          ))}
        </div>
      </section>

      <section className="platformSection platformSplit">
        <div>
          <p className="kicker dark"><span /> Helpful before you contact us</p>
          <h2>A little context makes the first conversation more useful.</h2>
        </div>
        <ul className="platformList">
          <li>Property address or neighborhood</li>
          <li>What you can see: leak, hail, wind, ice, wear or drainage</li>
          <li>When you first noticed the issue</li>
          <li>Residential, multi-family or commercial property</li>
          <li>Photos or documents you already have</li>
        </ul>
      </section>

      <section className="platformSection">
        <div className="platformEmpty">
          <span>Not sure where to begin?</span>
          <h2>Use the guided request and we will start from the problem, not a service label.</h2>
          <p>You do not need to diagnose the roof yourself. Describe what is happening and provide the property details you know.</p>
          <div className="heroActions">
            <a className="primaryButton light" href="/estimate/">Start guided request</a>
            <a className="textLink" href={`tel:${site.phone}`}>Call {site.phoneDisplay} →</a>
          </div>
        </div>
      </section>
    </main>
  );
}
