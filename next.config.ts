import type { NextConfig } from "next";
const path = require("path");
const nextConfig: NextConfig = {
  serverExternalPackages: ["@node-rs/argon2"],
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Ensure that all imports of 'yjs' resolve to the same instance
      config.resolve.alias["yjs"] = path.resolve(__dirname, "node_modules/yjs");
    }
    return config;
  },
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
