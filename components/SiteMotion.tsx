"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const MOTION_SELECTOR = [
  "main > section",
  ".serviceHeroInner > *",
  ".serviceBody > *",
  ".platformPage main > *",
  ".resourcePage main > *",
  ".aboutPage main > *",
  ".contactPage main > *",
  ".estimatePage main > *",
  ".reviewsPage main > *",
  ".serviceSplit > *",
  ".processGrid > *",
  ".relatedGrid > *",
  ".roofServiceGrid > *",
  ".roofProcessGrid > *",
  ".reviewsGrid > *",
  ".reviewGrid > *",
  ".cardGrid > *",
  ".infoGrid > *",
].join(",");

const HERO_SELECTOR = [
  ".serviceHero",
  ".platformHero",
  ".resourceHero",
  ".roofHero",
  ".aboutHero",
  ".contactHero",
  ".estimateHero",
  ".reviewsHero",
].join(",");

export default function SiteMotion() {
  const pathname = usePathname();

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) return;

    const targets = Array.from(document.querySelectorAll<HTMLElement>(MOTION_SELECTOR)).filter(
      (element) => !element.closest("[data-no-motion], .adminPage, [data-admin]")
    );

    const heroTargets = Array.from(document.querySelectorAll<HTMLElement>(HERO_SELECTOR)).filter(
      (element) => !element.closest("[data-no-motion], .adminPage, [data-admin]")
    );

    heroTargets.forEach((element) => element.setAttribute("data-intex-hero-motion", "ready"));

    targets.forEach((element, index) => {
      element.setAttribute("data-intex-motion", "ready");
      element.style.setProperty("--intex-motion-delay", `${Math.min(index % 6, 5) * 55}ms`);
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          (entry.target as HTMLElement).setAttribute("data-intex-motion", "visible");
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );

    targets.forEach((element) => observer.observe(element));

    const heroTimer = window.setTimeout(() => {
      heroTargets.forEach((element) => element.setAttribute("data-intex-hero-motion", "visible"));
    }, 40);

    return () => {
      window.clearTimeout(heroTimer);
      observer.disconnect();
    };
  }, [pathname]);

  return null;
}
