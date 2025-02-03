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
  // This is a "hast syntax tree" of the svg icon from the icon library called "action/link"
  // It uses the symbol id to reference the icon from the icon library with <Icon name="action/link" as="symbol" />
  content: {
    type: 'element',
    tagName: 'svg',
    properties: {
      className: 'anchorIcon',
      fill: 'none',
      height: 16,
      width: 16,
      viewBox: '0 0 16 16',
    },
    children: [{
      type: 'element',
      tagName: 'use',
      properties: { href: '#action/link' }
    }]
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
