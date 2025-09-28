import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // Allow production builds to successfully complete even if ESLint has warnings
    ignoreDuringBuilds: false,
  },
  typescript: {
    // Allow production builds to successfully complete even if TypeScript has warnings
    ignoreBuildErrors: false,
  },
};

export default nextConfig;
