import createMDX from '@next/mdx';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  pageExtensions: ['mdx', 'tsx'],
  experimental: {
    ppr: true,
    dynamicIO: true,
    optimizePackageImports: ['@/components', '@/markdown'],
  },
};

const withMDX = createMDX({
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
});

export default withMDX(nextConfig);
