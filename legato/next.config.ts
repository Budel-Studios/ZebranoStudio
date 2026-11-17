import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The parent folder (Zebrano Studio) has its own lockfile; pin the root here.
  turbopack: { root: __dirname },
};

export default nextConfig;
