/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true, // So NextJS doesn't cache images and bill you for it
    remotePatterns: [
      {
        protocol: "https",
        hostname: "storage.googleapis.com",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
    ],
  },
};

export default nextConfig;
