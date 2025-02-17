/** @type {import('next').NextConfig} */
require("dotenv").config();

const nextConfig = {
  env: {
    POSTGRES_URL: process.env.POSTGRES_URL,
    DATABASE_URL: process.env.DATABASE_URL,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.giftedartisan.com", // ✅ Existing domain
      },
      {
        protocol: "https",
        hostname: "encrypted-tbn0.gstatic.com", // ✅ Google images
      },
      {
        protocol: "https",
        hostname: "www.kuiu.com", // ✅ Added new domain for Kuiu images
      },
    ],
  },
};

module.exports = nextConfig;
