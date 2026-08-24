import Link from "next/link";
import { site } from "@/lib/site";

export default function MobileActionBar() {
  return (
    <aside className="mobileActionBar" aria-label="Quick Intex actions">
      <a className="mobileActionCall" href={`tel:${site.phone}`} aria-label={`Call Intex Chicago at ${site.phoneDisplay}`}>
        <span className="mobileActionIcon" aria-hidden="true">☎</span>
        <span>
          <small>Talk to Intex</small>
          <strong>Call now</strong>
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
