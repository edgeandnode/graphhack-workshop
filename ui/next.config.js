/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ['page.tsx'],
  env: {
    SUBGRAPH_URL: process.env.SUBGRAPH_URL,
  },
}

module.exports = nextConfig
