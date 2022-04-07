/** @type {import('next').NextConfig} */

require('dotenv').config();

const nextConfig = {
  reactStrictMode: true,
  env: {
    DEPLOY_URL:
      process.env.DEPLOY_URL,
    CONTRACT_ADDRESS: process.env.CONTRACT_ADDRESS,
    CHAIN_ID: process.env.CHAIN_ID,
  },
};

module.exports = nextConfig;
