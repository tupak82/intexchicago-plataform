import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BeforeAfter from "../BeforeAfter";
import { getPublicProjectBySlug } from "@/lib/project-store";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = await getPublicProjectBySlug(slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.summary,
    alternates: { canonical: `/projects/${project.slug}/` },
    openGraph: {
      title: project.title,
      description: project.summary,
      url: `/projects/${project.slug}/`,
      type: "article",
    },
  };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await getPublicProjectBySlug(slug);
  if (!project) notFound();

  const projectSchema = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.summary,
    about: project.service,
    spatialCoverage: project.location,
    ...(project.completedAt ? { dateCreated: project.completedAt } : {}),
  };

  return (
    <main className="platformPage">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(projectSchema) }} />
      <section className="platformHero compact">
        <div className="platformBreadcrumbs"><a href="/">Home</a> / <a href="/projects/">Projects</a> / {project.title}</div>
        <p className="kicker"><span /> {project.service} · {project.location}</p>
        <h1>{project.title}</h1>
        <p>{project.summary}</p>
      </section>
      <section className="platformSection">
        <BeforeAfter before={project.beforeImage} after={project.afterImage} alt={project.title} />
      </section>
      <section className="platformSection projectStory">
        <article><span>01</span><h2>Problem</h2><p>{project.problem}</p></article>
        <article><span>02</span><h2>Solution</h2><p>{project.solution}</p></article>
        <article><span>03</span><h2>Outcome</h2><p>{project.outcome}</p></article>
      </section>
    </main>
  );
}
