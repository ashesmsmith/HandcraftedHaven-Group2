import type { NextConfig } from "next";

console.log("🛠️ DATABASE_URL from Next.js config:", process.env.DATABASE_URL);

const nextConfig: NextConfig = {
  env: {
    DATABASE_URL: process.env.DATABASE_URL,
  },
};

export default nextConfig;


