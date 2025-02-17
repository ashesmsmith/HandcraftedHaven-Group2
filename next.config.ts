/** @type {import('next').NextConfig} */
require("dotenv").config();

const nextConfig = {
  env: {
    POSTGRES_URL: process.env.POSTGRES_URL,
    DATABASE_URL: process.env.DATABASE_URL,
  },
};

module.exports = nextConfig;


