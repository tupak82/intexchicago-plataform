import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BeforeAfter from "../BeforeAfter";
import { projectBySlug, publishedProjects } from "@/lib/projects";

export function generateStaticParams() {
  return publishedProjects.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = projectBySlug[slug];
  if (!project) return {};
  return {
    title: project.title,
    description: project.summary,
    alternates: { canonical: `/projects/${project.slug}/` },
  };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projectBySlug[slug];
  if (!project) notFound();

  return (
    <main className="platformPage">
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
