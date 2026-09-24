"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { site } from "@/lib/site";

// Not shown on the estimate flow (it competes with the form's own navigation) or in admin.
const hiddenPrefixes = ["/estimate", "/admin"];

export default function MobileActionBar() {
  const pathname = usePathname() || "/";
  if (hiddenPrefixes.some((prefix) => pathname.startsWith(prefix))) return null;

  return (
    <aside className="mobileActionBar" aria-label="Quick Intex actions">
      <a className="mobileActionCall" href={`tel:${site.phone}`}>
        <span className="mobileActionIcon" aria-hidden="true">☎</span>
        <span>
          <small>Talk to Intex</small>
          <strong>Call now<span className="srOnly"> {site.phoneDisplay}</span></strong>
        </span>
      </a>
      <Link className="mobileActionEstimate" href="/estimate/">
        <span>
          <small>Roofing + restoration</small>
          <strong>Start request</strong>
        </span>
        <span className="mobileActionArrow" aria-hidden="true">↗</span>
      </Link>
    </aside>
  );
}
