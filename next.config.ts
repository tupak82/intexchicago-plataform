import type { NextConfig } from "next";
import { legacyRedirects } from "./lib/legacy-redirects";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  compress: true,
  async redirects() {
    return legacyRedirects.map(({ source, destination, permanent }) => ({
      source,
      destination,
      permanent,
    }));
  },
};

export default nextConfig;
