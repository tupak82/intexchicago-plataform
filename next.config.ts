import type { NextConfig } from "next";
import { legacyQueryRedirects, legacyRedirects } from "./lib/legacy-redirects";

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
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
