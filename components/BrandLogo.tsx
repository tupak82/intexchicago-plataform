"use client";

import { useState } from "react";

const defaultLogoSrc = "/brand/intex-chicago-logo.png";

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
  const logoSrc = process.env.NEXT_PUBLIC_INTEX_LOGO_URL || defaultLogoSrc;

  return (
    <a className={`brand brandOfficial ${className}`.trim()} href={href} aria-label={label}>
      {!imageFailed ? (
        <img
          className="brandLogoImage"
          src={logoSrc}
          alt="Intex Chicago"
          onError={() => setImageFailed(true)}
        />
      ) : (
        <span className="brandFallback" aria-hidden="true">
          <strong>INTEX</strong>
          <small>CHICAGO</small>
        </span>
      )}
    </a>
  );
}
