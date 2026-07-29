import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    middlewareClientMaxBodySize: '50mb',
  },
  async rewrites() {
    return [
      {
        source: '/chat',
        destination: 'http://localhost:8000/chat',
      },
      {
        source: '/tts',
        destination: 'http://localhost:8000/tts',
      },
      {
        source: '/api/:path*',
        destination: 'http://localhost:8000/api/:path*',
      },
    ];
  },
};

export default nextConfig;