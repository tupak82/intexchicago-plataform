import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact Intex Restoration",
  description: "Contact Intex Restoration for roofing and property restoration help in Chicago and Chicagoland.",
  alternates: { canonical: "/contact/" },
};

export default function ContactPage() {
  return (
    <main className="platformPage">
      <section className="platformHero compact">
        <div className="platformBreadcrumbs"><a href="/">Home</a> / Contact</div>
        <p className="kicker"><span /> Contact Intex</p>
        <h1>Tell us what your property needs.</h1>
        <p>Call for immediate help or use the guided request flow for roofing, restoration, and planned property work.</p>
      </section>

      <section className="platformSection platformSplit">
        <div>
          <p className="kicker dark"><span /> Direct contact</p>
          <h2>One phone number. One email. One request flow.</h2>
        </div>
        <ul className="platformList">
          <li><a href={`tel:${site.phone}`}>Phone · {site.phoneDisplay}</a></li>
          <li><a href={`mailto:${site.email}`}>Email · {site.email}</a></li>
          <li><a href="/estimate/">Guided estimate / restoration request →</a></li>
        </ul>
      </section>
    </main>
  );
}
