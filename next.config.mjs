import createMDX from '@next/mdx';

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['mdx', 'tsx'],
  typescript: {
    ignoreBuildErrors: true,
  },
  experimental: {
    ppr: true,
    dynamicIO: true,
    // mdxRs: true,
    optimizePackageImports: ['@/components', '@/markdown'],
  },
};

const withMDX = createMDX({
  options: {
    remarkPlugins: [
      ['remark-gfm', { strict: true, throwOnError: true }]
    ],
    rehypePlugins: [
      ["rehype-mdx-code-props", { strict: true, throwOnError: true }] // Must run last
    ],
  },
});

export default withMDX(nextConfig);
