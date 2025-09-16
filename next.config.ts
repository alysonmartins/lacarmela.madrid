import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  images: {
    domains: ["proexweb.com", "localhost"],
    formats: ["image/webp", "image/avif"],
    qualities: [10, 20, 85, 100],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "s3.proexweb.com",
        pathname: "/lacarmelamadrid/**",
      },
    ],
    unoptimized: true, // Disables Next.js image optimization to allow any source
    // WARNING: This removes many performance benefits
  },
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://s3.proexweb.com/lacarmelamadrid/:path*",
      },
    ];
  },
};
export default nextConfig;
