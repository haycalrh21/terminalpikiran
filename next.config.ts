import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["@node-rs/argon2"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.haycal.my.id",
        port: "",
      },
    ],
  },
};

export default nextConfig;
