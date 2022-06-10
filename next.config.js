/** @type {import("next").NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "res.cloudinary.com"
    ]
  },
  devIndicators: {
    autoPrerender: false
  }
}

module.exports = nextConfig
