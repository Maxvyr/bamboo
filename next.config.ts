import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Enable server actions for API routes
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb', // Allow larger image uploads
    },
  },
};

export default nextConfig;
