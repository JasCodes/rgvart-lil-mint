/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  env: {
    DEPLOY_URL:
    process.env.DEPLOY_URL,
  },
};

module.exports = nextConfig;
