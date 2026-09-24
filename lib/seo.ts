import type { Metadata } from "next";

/**
 * Page titles get the root template "%s | Intex Chicago Roofing". When a page title already
 * names the brand, bypass the template so the brand is not doubled. The page's own brand
 * wording is kept as-is (no renaming).
 */
export function pageTitle(title: string): NonNullable<Metadata["title"]> {
  return /\bintex\b/i.test(title) ? { absolute: title } : title;
}

export const ogImageSize = { width: 1200, height: 630 } as const;

/** Default share image (app/og-image.png/route.tsx). Child openGraph objects replace the parent's,
 *  so pages that define their own openGraph spread this in explicitly. */
export const defaultOgImages = [
  {
    url: "/og-image.png",
    ...ogImageSize,
    type: "image/png",
    alt: "Intex Chicago Roofing — roofing, storm damage and property restoration in Chicago",
  },
];
