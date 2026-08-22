import type { Metadata } from "next";
import EstimateFlow from "./EstimateFlow";
import { site } from "@/lib/site";
import { BrandLogo } from "@/components/BrandLogo";

export const metadata: Metadata = {
  title: "Request Restoration or Roofing Help",
  description: "Start a restoration or roofing request with Intex Restoration in Chicagoland.",
  alternates: { canonical: "/estimate/" },
  robots: { index: false, follow: true },
};

export default function EstimatePage() {
  return (
    <main className="estimatePage">
      <header className="estimateHeader">
        <BrandLogo href="/" label="Intex Chicago home" />
        <a className="navCall" href={`tel:${site.phone}`}>Call {site.phoneDisplay}</a>
      </header>
      <section className="estimateShell">
        <div className="estimateIntro">
          <p className="kicker"><span /> Restoration + roofing request</p>
          <h1>Start with the problem. We&apos;ll organize the details.</h1>
          <p>A short step-by-step request designed for phones, emergencies, and planned roofing work.</p>
        </div>
        <EstimateFlow />
      </section>
    </main>
  );
}
