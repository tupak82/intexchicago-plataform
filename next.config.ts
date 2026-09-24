import type { NextConfig } from "next";
import { legacyQueryRedirects, legacyRedirects } from "./lib/legacy-redirects";

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  // HSTS without includeSubDomains/preload so other subdomains are unaffected.
  { key: "Strict-Transport-Security", value: "max-age=31536000" },
  // Report-Only first: browsers log violations to the console but nothing is blocked.
  // Tighten and switch to enforcing Content-Security-Policy once it has been observed clean.
  {
    key: "Content-Security-Policy-Report-Only",
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob: https:",
      "font-src 'self' data:",
      "connect-src 'self' https://www.google-analytics.com https://*.google-analytics.com https://*.analytics.google.com https://www.googletagmanager.com",
      "frame-src 'self' https://www.googletagmanager.com",
      "frame-ancestors 'self'",
      "base-uri 'self'",
      "object-src 'none'",
      "form-action 'self'",
    ].join("; "),
  },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  trailingSlash: true,
  // Cap CDN stale-while-revalidate for ISR pages (default is ~1 year).
  expireTime: 86400,
  compress: true,
  async redirects() {
    return [
      {
        source: "/:path*",
        destination: "https://intexchicago.com/:path*",
        permanent: true,
        has: [{ type: "host" as const, value: "www.intexchicago.com" }],
      },
      ...legacyRedirects.map(({ source, destination, permanent }) => ({
        source,
        destination,
        permanent,
      })),
      ...legacyQueryRedirects.map(({ source, destination, permanent, queryKey, queryValue }) => ({
        source,
        destination,
        permanent,
        has: [{ type: "query" as const, key: queryKey, value: queryValue }],
      })),
    ];
  },
  async rewrites() {
    return [{ source: "/favicon.ico", destination: "/icon.svg" }];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
