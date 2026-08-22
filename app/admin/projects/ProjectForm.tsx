import type { AdminProject } from "@/lib/project-store";

export default function ProjectForm({ project }: { project?: AdminProject | null }) {
  const action = project ? `/api/admin/projects/${project.id}/` : "/api/admin/projects/";

  return (
    <form className="adminEditorForm" action={action} method="post">
      <div className="adminEditorGrid">
        <label>
          Project title
          <input name="title" required defaultValue={project?.title || ""} placeholder="Storm-damaged roof restoration" />
        </label>
        <label>
          URL slug
          <input name="slug" required defaultValue={project?.slug || ""} placeholder="storm-roof-restoration-lakeview" pattern="[a-z0-9-]+" />
        </label>
        <label>
          Service
          <input name="service" required defaultValue={project?.service || ""} placeholder="Roofing / Storm Damage" />
        </label>
        <label>
          Property type
          <select name="propertyType" defaultValue={project?.propertyType || "Residential"}>
            <option value="Residential">Residential</option>
            <option value="Commercial">Commercial</option>
          </select>
        </label>
        <label>
          Location
          <input name="location" required defaultValue={project?.location || ""} placeholder="Chicago, IL" />
        </label>
        <label>
          Completion date
          <input name="completedAt" type="date" defaultValue={project?.completedAt || ""} />
        </label>
      </div>

      <label>
        Summary
        <textarea name="summary" rows={4} required defaultValue={project?.summary || ""} placeholder="Short factual overview shown in project cards and search results." />
      </label>
      <label>
        Problem
        <textarea name="problem" rows={5} required defaultValue={project?.problem || ""} placeholder="What condition did the property have before the work?" />
      </label>
      <label>
        Solution
        <textarea name="solution" rows={5} required defaultValue={project?.solution || ""} placeholder="What work was performed?" />
      </label>
      <label>
        Outcome
        <textarea name="outcome" rows={5} required defaultValue={project?.outcome || ""} placeholder="What changed after the work was completed?" />
      </label>

      <div className="adminEditorGrid">
        <label>
          Before image URL
          <input name="beforeImage" type="url" required={Boolean(project?.published)} defaultValue={project?.beforeImage || ""} placeholder="https://..." />
        </label>
        <label>
          After image URL
          <input name="afterImage" type="url" required={Boolean(project?.published)} defaultValue={project?.afterImage || ""} placeholder="https://..." />
        </label>
      </div>

      <label className="adminPublishToggle">
        <input name="published" type="checkbox" value="true" defaultChecked={project?.published || false} />
        <span><strong>Publish project</strong><small>Only publish after job details, location, image rights, and before/after photos are verified.</small></span>
      </label>

      <div className="adminEditorActions">
        <a href="/admin/projects/">Cancel</a>
        <button type="submit">{project ? "Save project" : "Create project"}</button>
      </div>
    </form>
  );
}
