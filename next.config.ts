import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  pageExtensions: ['tsx', 'ts'],
  turbopack: {},
};

export default nextConfig;
