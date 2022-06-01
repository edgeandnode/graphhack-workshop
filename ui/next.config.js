/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: process.env.NEXT_BASE_PATH || '',
  reactStrictMode: true,
  pageExtensions: ['page.tsx'],
  env: {
    SUBGRAPH_URL: process.env.SUBGRAPH_URL,
    INFURA_KEY: process.env.INFURA_KEY,
    IPFS_URI: process.env.IPFS_URI,
  },
  eslint: {
    ignoreDuringBuilds: true, // we run ESLint from the root directory
  },
}

module.exports = nextConfig
