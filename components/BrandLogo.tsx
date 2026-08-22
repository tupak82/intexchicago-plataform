"use client";

import { useState } from "react";

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
    <a className={`brand brandOfficial ${className}`.trim()} href={href} aria-label={label}>
      {showImage ? (
        <img
          className="brandLogoImage"
          src={logoSrc}
          alt="Intex Chicago"
          onError={() => setImageFailed(true)}
        />
      ) : (
        <span className="brandFallback" aria-hidden="true">
          <span className="brandFallbackMark">I</span>
          <span className="brandFallbackWords">
            <strong>INTEX</strong>
            <small>CHICAGO</small>
          </span>
        </span>
      )}
    </a>
  );
}
