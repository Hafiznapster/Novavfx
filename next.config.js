/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // Set the base path if you're deploying to a subdirectory
  // basePath: '/Novavfx',
  // Disable trailing slashes
  trailingSlash: false,
}

module.exports = nextConfig
