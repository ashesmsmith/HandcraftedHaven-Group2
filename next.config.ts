/** @type {import('next').NextConfig} */
require("dotenv").config(); 

const nextConfig = {
  env: {
    POSTGRES_URL: process.env.POSTGRES_URL,
    DATABASE_URL: process.env.DATABASE_URL,
  },
};

console.log("🔍 DEBUG: POSTGRES_URL from Next.js config:", process.env.POSTGRES_URL);

module.exports = nextConfig; 
//