import type {NextConfig} from 'next';

const repoName = 'pixelpatch'; 

const nextConfig: NextConfig = {
  /* config options here */
  output: 'export',
  basePath: `/${repoName}`,
  assetPrefix: `/${repoName}/`,
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
