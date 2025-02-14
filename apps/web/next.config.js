/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      domains: ["images.unsplash.com"], // Allow Unsplash images
      formats: ["image/avif", "image/webp"], // Support modern image formats
    },
  };
  
  export default nextConfig;
  