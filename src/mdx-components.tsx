import type { MDXComponents } from 'mdx/types';
import Image, { ImageProps } from 'next/image';

import { Headings } from '@/markdown';

// Generic MDX components
// To customize the MDX components locally see https://nextjs.org/docs/canary/app/building-your-application/configuring/mdx#local-styles-and-components
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: (props) => <Headings size="h1" {...props} />,
    h2: (props) => <Headings size="h2" {...props} />,
    h3: (props) => <Headings size="h3" {...props} />,
    h4: (props) => <Headings size="h4" {...props} />,
    h5: (props) => <Headings size="h5" {...props} />,
    h6: (props) => <Headings size="h6" {...props} />,

    img: (props) => (
      <Image sizes="100vw" style={{ width: '100%', height: 'auto' }} {...(props as ImageProps)} />
    ),

    ...components,
  };
}
