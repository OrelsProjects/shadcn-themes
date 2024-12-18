/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true, // Ensures strict mode is enabled
  swcMinify: true, // Enables SWC-based minification (faster)
  // allow "apps-og-images.s3.us-east-1.amazonaws.com" as image source
  images: {
    unoptimized: true,
    domains: ["apps-og-images.s3.us-east-1.amazonaws.com"],
  },
};

export default nextConfig;
