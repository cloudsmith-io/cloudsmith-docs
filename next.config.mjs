import createMDX from '@next/mdx';
import { quickNavPrefix } from './src/lib/constants/settings.mjs';

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['mdx', 'tsx'],
  experimental: {
    ppr: 'incremental',
    dynamicIO: true,
    optimizePackageImports: ['@/components', '@/markdown', '@/icons'],
    turbo: {
      rules: {
        '*.svg': {
          loaders: ['@svgr/webpack'],
          as: '*.js',
        },
      },
    },
  },
  images: {
    // TODO: Only add trusted domains
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'github.com',
      },
    ],
  },
};

const withMDX = createMDX({
  options: {
    remarkPlugins: [['remark-gfm']],
    rehypePlugins: [['rehype-slug', { prefix: quickNavPrefix }]],
  },
});

export default withMDX(nextConfig);
