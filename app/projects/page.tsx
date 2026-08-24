import type { Metadata } from "next";
import { listPublicProjects } from "@/lib/project-store";
import { site } from "@/lib/site";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Roofing & Restoration Projects",
  description: "Browse documented Intex Chicago roofing and property restoration case studies from Chicago and Chicagoland.",
  alternates: { canonical: "/projects/" },
};

export default async function ProjectsPage() {
  const publishedProjects = await listPublicProjects();

  return (
    <main className="platformPage">
      <section className="platformHero">
        <div className="platformBreadcrumbs"><a href="/">Home</a> / Projects</div>
        <p className="kicker"><span /> Documented work</p>
        <h1>See the problem, the work, and the finished result.</h1>
        <p>Project case studies focus on the conditions that mattered: what was damaged, what work was performed, what roofing or restoration system was used, and how the property was left when the job was complete.</p>
        <div className="heroActions">
          <a className="primaryButton" href="/estimate/">Request an estimate</a>
          <a className="secondaryButton" href={`tel:${site.phone}`}>Call {site.phoneDisplay}</a>
        </div>
      </section>

      <section className="platformSection">
        {publishedProjects.length ? (
          <>
            <div className="sectionHeading">
              <div>
                <p className="kicker dark"><span /> Case studies</p>
                <h2>Real project details, organized clearly.</h2>
              </div>
              <p>Each published case study is tied to documented project information and approved imagery.</p>
            </div>
            <div className="platformGrid">
              {publishedProjects.map((project) => (
                <a className="platformCard" href={`/projects/${project.slug}/`} key={project.slug}>
                  <span>{project.service} · {project.location}</span>
                  <h2>{project.title}</h2>
                  <p>{project.summary}</p>
                  <b>View case study →</b>
                </a>
              ))}
            </div>
          </>
        ) : (
          <div className="platformEmpty">
            <span>Project documentation</span>
            <h2>Case studies will appear here as documented projects are approved for public display.</h2>
            <p>Rather than use stock photos or anonymous project claims, this gallery is reserved for work that can be shown with accurate scope, location context, and approved imagery.</p>
            <div className="heroActions">
              <a className="primaryButton light" href="/estimate/">Talk about your roof</a>
              <a className="textLink" href={`tel:${site.phone}`}>Call {site.phoneDisplay} →</a>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
