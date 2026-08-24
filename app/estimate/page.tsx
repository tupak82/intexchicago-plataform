import type { Metadata } from "next";
import EstimateFlow, { type EstimateServiceOption } from "./EstimateFlow";
import { site } from "@/lib/site";
import { BrandLogo } from "@/components/BrandLogo";

export const metadata: Metadata = {
  title: "Request Restoration or Roofing Help",
  description: "Start a restoration or roofing request with Intex Restoration in Chicagoland.",
  alternates: { canonical: "/estimate/" },
  robots: { index: false, follow: true },
};

const serviceParamMap: Record<string, EstimateServiceOption> = {
  "roof-repair-chicago": "Roof leak / roof repair",
  "roof-replacement-chicago": "Roof replacement",
  "storm-damage-restoration-chicago": "Storm / hail damage roofing",
  "flat-roofing-chicago": "Flat roof / TPO roofing",
  "commercial-roofing-chicago": "Commercial roofing",
  "roof-inspection-chicago": "Roof inspection",
  "water-damage-restoration-chicago": "Water damage",
  "fire-damage-restoration-chicago": "Fire / smoke damage",
  "mold-remediation-chicago": "Mold concern",
  "trauma-biohazard-cleaning-chicago": "Trauma / biohazard cleanup",
  "insurance-claims": "Insurance claim documentation",
  "commercial-restoration-chicago": "Commercial restoration",
};

type EstimatePageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

export default async function EstimatePage({ searchParams }: EstimatePageProps) {
  const resolvedSearchParams = searchParams ? await searchParams : {};
  const rawService = Array.isArray(resolvedSearchParams.service)
    ? resolvedSearchParams.service[0]
    : resolvedSearchParams.service;
  const initialService = rawService ? serviceParamMap[rawService] : undefined;

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
        <EstimateFlow initialService={initialService} />
      </section>
    </main>
  );
}
