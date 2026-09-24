import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { resourceBySlug, publishedResources } from "@/lib/resources";
import { site } from "@/lib/site";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { defaultOgImages } from "@/lib/seo";

export function generateStaticParams() {
  return publishedResources.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = resourceBySlug[slug];
  if (!article) return {};
  return {
    title: article.title,
    description: article.description,
    alternates: { canonical: `/resources/${article.slug}/` },
    openGraph: {
      images: defaultOgImages,
      title: article.title,
      description: article.description,
      type: "article",
      url: `/resources/${article.slug}/`,
    },
  };
}

export default async function ResourceArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = resourceBySlug[slug];
  if (!article) notFound();

  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt,
    author: { "@type": "Organization", name: site.name },
    publisher: { "@type": "Organization", name: site.name },
    mainEntityOfPage: `${site.url}/resources/${article.slug}/`,
  };

  return (
    <main className="platformPage">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <section className="platformHero compact">
        <Breadcrumbs className="platformBreadcrumbs" items={[{ name: "Resources", href: "/resources/" }, { name: article.title, href: `/resources/${article.slug}/` }]} />
        <p className="kicker"><span /> {article.category}</p>
        <h1>{article.title}</h1>
        <p>{article.description}</p>
      </section>

      <article className="platformSection resourceArticle">
        {article.sections.map((section) => (
          <section key={section.heading}>
            <h2>{section.heading}</h2>
            {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            {section.bullets && <ul>{section.bullets.map((item) => <li key={item}>{item}</li>)}</ul>}
          </section>
        ))}
        <aside className="resourceNotice">
          <strong>Safety note</strong>
          <p>This guide is general information, not a substitute for emergency services, engineering, legal, insurance, or other professional advice. If conditions are unsafe, prioritize people and contact the appropriate emergency service.</p>
        </aside>
      </article>
    </main>
  );
}
