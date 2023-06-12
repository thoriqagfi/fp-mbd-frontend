/** @type {import('next').NextConfig} */
require("dotenv").config();

const nextConfig = {
  reactStrictMode: true,
  eslint: {
    dirs: ["src"],
  },
  env: {
    API_URL: process.env.API_URL,
  },
  images: {
    domains: ["drive.google.com", "lh3.googleusercontent.com"]
  },
};

module.exports = nextConfig
