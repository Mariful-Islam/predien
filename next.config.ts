import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  redirects() {
    return Promise.resolve([
      {
        source: '/robots.txt',
        destination: '/api/robots',
        permanent: true, // This means it’s a permanent redirect (HTTP status 301)
      },
    ]);
  },
  images: {
    domains: ['predien.vercel.app', 'res.cloudinary.com', 'i.pravatar.cc'], // Add your image domains here
  },
};

export default nextConfig;
