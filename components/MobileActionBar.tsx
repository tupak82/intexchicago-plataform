import Link from "next/link";
import { site } from "@/lib/site";

export default function MobileActionBar() {
  return (
    <aside className="mobileActionBar" aria-label="Quick roofing actions">
      <a className="mobileActionCall" href={`tel:${site.phone}`} aria-label={`Call Intex Chicago at ${site.phoneDisplay}`}>
        <span className="mobileActionIcon" aria-hidden="true">☎</span>
        <span>
          <small>24/7 roofing help</small>
          <strong>Call now</strong>
        </span>
      </a>
      <Link className="mobileActionEstimate" href="/estimate">
        <span>
          <small>Fast response</small>
          <strong>Free estimate</strong>
        </span>
        <span className="mobileActionArrow" aria-hidden="true">↗</span>
      </Link>
    </aside>
  );
}
