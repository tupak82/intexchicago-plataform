"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BrandLogo } from "@/components/BrandLogo";
import { site } from "@/lib/site";

const hiddenPrefixes = ["/estimate", "/admin"];

export default function SiteChrome() {
  const pathname = usePathname();
  const hidden = hiddenPrefixes.some((prefix) => pathname.startsWith(prefix));
  const isHome = pathname === "/";

  if (hidden || isHome) return null;

  return (
    <>
      <header className="siteHeader siteHeaderGlobal">
        <BrandLogo href="/" label="Intex Chicago home" />
        <nav aria-label="Primary navigation">
          <Link href="/roofing-chicago/">Roofing</Link>
          <Link href="/restoration/">Restoration</Link>
          <Link href="/projects/">Projects</Link>
          <Link href="/service-areas/">Service Areas</Link>
          <Link href="/contact/">Contact</Link>
          <a className="navCall" href={`tel:${site.phone}`}>Call {site.phoneDisplay}</a>
        </nav>
      </header>

      <footer className="siteFooter">
        <div className="siteFooterBrand">
          <BrandLogo href="/" label="Intex Chicago home" className="footerBrand" />
          <p>Roofing and property restoration for Chicago and Chicagoland.</p>
        </div>
        <div className="siteFooterLinks">
          <div>
            <strong>Roofing</strong>
            <Link href="/roof-repair-chicago/">Roof Repair</Link>
            <Link href="/roof-replacement-chicago/">Roof Replacement</Link>
            <Link href="/flat-roofing-chicago/">Flat Roofing</Link>
            <Link href="/commercial-roofing-chicago/">Commercial Roofing</Link>
          </div>
          <div>
            <strong>Restoration</strong>
            <Link href="/restoration/">All Restoration Services</Link>
            <Link href="/water-damage-restoration-chicago/">Water Damage</Link>
            <Link href="/fire-damage-restoration-chicago/">Fire & Smoke</Link>
            <Link href="/mold-remediation-chicago/">Mold Remediation</Link>
            <Link href="/commercial-restoration-chicago/">Commercial Restoration</Link>
          </div>
          <div>
            <strong>Intex</strong>
            <Link href="/about/">About</Link>
            <Link href="/projects/">Projects</Link>
            <Link href="/service-areas/">Service Areas</Link>
            <Link href="/resources/">Resources</Link>
            <Link href="/contact/">Contact</Link>
          </div>
        </div>
        <div className="siteFooterContact">
          <a href={`tel:${site.phone}`}>{site.phoneDisplay}</a>
          <a href={`mailto:${site.email}`}>{site.email}</a>
          <Link href="/estimate/">Start a request →</Link>
        </div>
      </footer>
    </>
  );
}
