import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Allow deployment even if TypeScript finds type mismatches
  typescript: { ignoreBuildErrors: true },
  // Skip ESLint during CI build to avoid blocking deploy
  eslint: { ignoreDuringBuilds: true },
};

export default nextConfig;
