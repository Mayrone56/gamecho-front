/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["res.cloudinary.com", "media.rawg.io"],
  },
};

module.exports = nextConfig;
