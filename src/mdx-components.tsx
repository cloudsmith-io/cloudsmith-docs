import type { MDXComponents } from 'mdx/types';
import Image, { ImageProps } from 'next/image';

import { Heading } from '@/markdown';

// Generic MDX components
// To customize the MDX components locally see https://nextjs.org/docs/canary/app/building-your-application/configuring/mdx#local-styles-and-components
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: (props) => <Heading size="h1" {...props} />,
    h2: (props) => <Heading size="h2" {...props} />,
    h3: (props) => <Heading size="h3" {...props} />,
    h4: (props) => <Heading size="h4" {...props} />,
    h5: (props) => <Heading size="h5" {...props} />,
    h6: (props) => <Heading size="h6" {...props} />,

    img: (props) => (
      <Image sizes="100vw" style={{ width: '100%', height: 'auto' }} {...(props as ImageProps)} />
    ),

    ...components,
  };
}
