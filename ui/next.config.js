/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: process.env.NEXT_BASE_PATH || '/',
  reactStrictMode: true,
  pageExtensions: ['page.tsx'],
  env: {
    SUBGRAPH_URL: process.env.SUBGRAPH_URL,
    INFURA_KEY: process.env.INFURA_KEY,
  },
  eslint: {
    ignoreDuringBuilds: true, // we run ESLint from the root directory
  },
}

module.exports = nextConfig
