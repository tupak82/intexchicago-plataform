import type { Metadata } from "next";
import { publishedResources } from "@/lib/resources";

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
        <p className="kicker"><span /> Intex Resources</p>
        <h1>Useful answers before, during, and after property damage.</h1>
        <p>Short, practical guides for roofing, water damage, storms, and insurance documentation.</p>
      </section>
      <section className="platformSection">
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
