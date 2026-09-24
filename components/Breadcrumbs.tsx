import Link from "next/link";
import { site } from "@/lib/site";

export type Crumb = { name: string; href: string };

/**
 * Breadcrumb trail rendered as <nav aria-label="Breadcrumb"><ol>…</ol></nav> with the current page
 * marked aria-current="page", plus matching schema.org BreadcrumbList JSON-LD. "Home" is prepended.
 */
export function Breadcrumbs({ items, className }: { items: Crumb[]; className: string }) {
  const trail: Crumb[] = [{ name: "Home", href: "/" }, ...items];
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: new URL(crumb.href, site.url).toString(),
    })),
  };

  return (
    <nav aria-label="Breadcrumb" className={`${className} breadcrumbNav`}>
      <ol>
        {trail.map((crumb, index) => {
          const isLast = index === trail.length - 1;
          return (
            <li key={crumb.href}>
              {index > 0 ? <span className="breadcrumbSep" aria-hidden="true"> / </span> : null}
              {isLast ? <span aria-current="page">{crumb.name}</span> : <Link href={crumb.href}>{crumb.name}</Link>}
            </li>
          );
        })}
      </ol>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    </nav>
  );
}
