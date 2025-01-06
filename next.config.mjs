import createMDX from '@next/mdx';

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

/** @type {import('rehype-autolink-headings').Options} */
const rehypeAutolinkHeadings = {
  behavior: 'append',
  properties: {
    tabIndex: 0,
    ariaHidden: true,
    className: 'anchor'
  },
  content: {
    type: 'element',
    tagName: 'span',
    properties: { className: 'anchorIcon' },
  }
};

const withMDX = createMDX({
  options: {
    remarkPlugins: [['remark-gfm']],
    rehypePlugins: [
      ['rehype-sanitize'],
      ['rehype-slug'],
      ['rehype-autolink-headings', rehypeAutolinkHeadings],
    ],
  },
});

export default withMDX(nextConfig);
