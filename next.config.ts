import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    // Single-version project: /teal is the canonical landing page.
    return [{ source: "/", destination: "/teal", permanent: false }];
  },
};

export default nextConfig;
