import createMDX from '@next/mdx';

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['mdx', 'tsx'],
  experimental: {
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
    // Do not allow external images
    remotePatterns: [],
  },
};

/** @type {import('rehype-autolink-headings').Options} */
const rehypeAutolinkHeadings = {
  behavior: 'append',
  properties: {
    tabIndex: 0,
    ariaHidden: true,
    className: 'anchor',
  },
  content: {
    type: 'element',
    tagName: 'span',
    properties: { className: 'anchorIcon' },
  },
};

const withMDX = createMDX({
  options: {
    remarkPlugins: [
      ['remark-gfm'],
      ['remark-frontmatter'],
      ['remark-mdx-frontmatter', { name: 'frontmatter' }],
    ],
    rehypePlugins: [
      // This removes all imports and images from the markdown document
      //['rehype-sanitize'],
      ['rehype-slug'],
      ['rehype-autolink-headings', rehypeAutolinkHeadings],
    ],
  },
});

export default withMDX(nextConfig);
