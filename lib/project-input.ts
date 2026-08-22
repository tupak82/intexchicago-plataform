import type { ProjectInput } from "@/lib/project-store";

export type ProjectInputResult =
  | { ok: true; value: ProjectInput }
  | { ok: false; error: string };

function text(form: FormData, key: string) {
  return String(form.get(key) || "").trim();
}

export function parseProjectInput(form: FormData): ProjectInputResult {
  const slug = text(form, "slug").toLowerCase();
  const title = text(form, "title");
  const service = text(form, "service");
  const propertyType = text(form, "propertyType");
  const location = text(form, "location");
  const summary = text(form, "summary");
  const problem = text(form, "problem");
  const solution = text(form, "solution");
  const outcome = text(form, "outcome");
  const beforeImage = text(form, "beforeImage");
  const afterImage = text(form, "afterImage");
  const completedAt = text(form, "completedAt") || undefined;
  const published = form.get("published") === "true";

  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) return { ok: false, error: "invalid_slug" };
  if (!title || !service || !location || !summary || !problem || !solution || !outcome) {
    return { ok: false, error: "missing_required_fields" };
  }
  if (propertyType !== "Residential" && propertyType !== "Commercial") {
    return { ok: false, error: "invalid_property_type" };
  }
  if (completedAt && !/^\d{4}-\d{2}-\d{2}$/.test(completedAt)) {
    return { ok: false, error: "invalid_completion_date" };
  }

  if (published) {
    if (!beforeImage || !afterImage) return { ok: false, error: "published_project_requires_images" };
    try {
      new URL(beforeImage);
      new URL(afterImage);
    } catch {
      return { ok: false, error: "invalid_project_image_url" };
    }
  }

  return {
    ok: true,
    value: {
      slug,
      title: title.slice(0, 255),
      service: service.slice(0, 120),
      propertyType,
      location: location.slice(0, 190),
      summary: summary.slice(0, 4000),
      problem: problem.slice(0, 10_000),
      solution: solution.slice(0, 10_000),
      outcome: outcome.slice(0, 10_000),
      beforeImage: beforeImage.slice(0, 1024),
      afterImage: afterImage.slice(0, 1024),
      completedAt,
      published,
    },
  };
}
