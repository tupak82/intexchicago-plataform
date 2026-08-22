import type { Metadata } from "next";
import { serviceAreas } from "@/lib/service-areas";

export const metadata: Metadata = {
  title: "Service Areas",
  description: "Explore Intex Restoration service coverage in Chicago and the surrounding Chicagoland area.",
  alternates: { canonical: "/service-areas/" },
};

export default function ServiceAreasPage() {
  return (
    <main className="platformPage">
      <section className="platformHero">
        <div className="platformBreadcrumbs"><a href="/">Home</a> / Service Areas</div>
        <p className="kicker"><span /> Local coverage</p>
        <h1>Chicago first. Expand only where coverage is real.</h1>
        <p>Our location architecture is built to grow without generating thin SEO pages. New municipality pages are published only after service coverage and useful local content are verified.</p>
      </section>

      <section className="platformSection">
        <div className="platformGrid">
          {serviceAreas.filter((area) => area.indexable).map((area) => (
            <a className="platformCard" href={`/service-areas/${area.slug}/`} key={area.slug}>
              <span>Service area</span>
              <h2>{area.name}</h2>
              <p>{area.description}</p>
              <b>Explore coverage →</b>
            </a>
          ))}
        </div>
      </section>
    </main>
  );
}
