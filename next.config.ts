import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    // Prevent local AppleDouble cache artifacts from breaking /_next/image in dev on this volume.
    unoptimized: process.env.NODE_ENV === "development",
  },
};

export default nextConfig;
