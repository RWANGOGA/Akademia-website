import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    middlewareClientMaxBodySize: "50mb",
  },
  async rewrites() {
    return [
      {
        source: "/chat",
        destination: "/api/chat",
      },
      {
        source: "/tts",
        destination: "/api/tts",
      },
      {
        source: "/uploads/:path*",
        destination: "/api/uploads/:path*",
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "realmdigital.com",
      },
      {
        protocol: "https",
        hostname: "maps.google.com",
      },
      {
        protocol: "https",
        hostname: "*.akademia.co.jp",
      },
      {
        protocol: "https",
        hostname: "ai-dojo-opal.vercel.app",
      },
      {
        protocol: "https",
        hostname: "uj-tc-api.akademia.co.jp",
      },
      {
        protocol: "https",
        hostname: "ai-daily-report.akademia.co.jp",
      },
      {
        protocol: "https",
        hostname: "ai-avatar.akademia.co.jp",
      },
      {
        protocol: "https",
        hostname: "vf.akademia.co.jp",
      },
      {
        protocol: "https",
        hostname: "ai-recruiter.akademia.co.jp",
      },
    ],
  },
};

export default nextConfig;