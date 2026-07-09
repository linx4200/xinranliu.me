import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  cacheComponents: true,
  output: 'standalone',
  logging: {
    fetches: {
      fullUrl: true,
    }
  }
};

export default nextConfig;
