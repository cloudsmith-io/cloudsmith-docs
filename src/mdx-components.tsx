import { ComponentPropsWithoutRef } from 'react';

import type { MDXComponents } from 'mdx/types';
import Image, { ImageProps } from 'next/image';

import { CodeBlock, Heading } from '@/markdown';

type HeadingProps<T extends React.ElementType = 'h1'> = ComponentPropsWithoutRef<T>;

const components = {
  h1: (props: HeadingProps<'h1'>) => <Heading size="h1" {...props} />,
  h2: (props: HeadingProps<'h2'>) => <Heading size="h2" {...props} />,
  h3: (props: HeadingProps<'h3'>) => <Heading size="h3" {...props} />,
  h4: (props: HeadingProps<'h4'>) => <Heading size="h4" {...props} />,
  h5: (props: HeadingProps<'h5'>) => <Heading size="h5" {...props} />,
  h6: (props: HeadingProps<'h6'>) => <Heading size="h6" {...props} />,

  pre: ({ children, ...props }: ComponentPropsWithoutRef<'pre'>) => {
    // This type assertion is necessary because the type of children is not always ReactElement
    const codeProps = (children as React.ReactElement).props as React.HTMLProps<HTMLElement>;
    const code = codeProps.children as string;
    const lang = (codeProps.className || '').replace(/language-/, '');

    return <CodeBlock code={code} lang={lang} {...props} />;
  },

  img: (props: ImageProps) => <Image sizes="100vw" style={{ width: '100%', height: 'auto' }} {...props} />,
};

declare global {
  type MDXProvidedComponents = typeof components;
}

// To customize the MDX components locally see https://nextjs.org/docs/canary/app/building-your-application/configuring/mdx#local-styles-and-components
export function useMDXComponents(localComponents: MDXComponents): MDXProvidedComponents {
  return {
    ...components,
    ...localComponents,
  };
}
