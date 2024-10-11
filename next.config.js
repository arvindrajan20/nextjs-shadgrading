/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    CANVAS_API_URL: process.env.CANVAS_API_URL,
    CANVAS_API_TOKEN: process.env.CANVAS_API_TOKEN,
  },
}

module.exports = nextConfig