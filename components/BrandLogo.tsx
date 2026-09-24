"use client";

import { useState } from "react";

function labelSuffix(label: string) {
  const suffix = label.replace(/^intex chicago( roofing)?/i, "").trim();
  return suffix ? ` ${suffix}` : "";
}

export function BrandLogo({
  href = "/",
  label = "Intex Chicago home",
  className = "",
}: {
  href?: string;
  label?: string;
  className?: string;
}) {
  const [imageFailed, setImageFailed] = useState(false);
  const logoSrc = process.env.NEXT_PUBLIC_INTEX_LOGO_URL?.trim();
  const showImage = Boolean(logoSrc) && !imageFailed;

  return (
    // The accessible name starts with the visible words ("Intex Chicago") so it matches what
    // sighted voice-control users see (WCAG 2.5.3 Label in Name); `label` adds context after it.
    <a className={`brand brandOfficial ${className}`.trim()} href={href}>
      {showImage ? (
        <img
          className="brandLogoImage"
          src={logoSrc}
          alt={label}
          onError={() => setImageFailed(true)}
        />
      ) : (
        <span className="brandFallback">
          <span className="brandFallbackMark" aria-hidden="true">I</span>
          <span className="brandFallbackWords">
            <strong>INTEX</strong>
            <small>CHICAGO</small>
          </span>
          <span className="srOnly">{labelSuffix(label)}</span>
        </span>
      )}
    </a>
  );
}
