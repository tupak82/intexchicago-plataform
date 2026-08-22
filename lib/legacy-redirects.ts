export type LegacyRedirect = {
  source: string;
  destination: string;
  permanent: boolean;
  note?: string;
};

// Keep this list empty until a legacy URL has been verified from the WordPress
// export, sitemap, analytics, Search Console, or a confirmed indexed result.
// Never guess old URLs: an incorrect 301 can destroy relevance and rankings.
export const legacyRedirects: LegacyRedirect[] = [];
