import { ComponentPropsWithoutRef, Suspense } from 'react';

import type { MDXComponents } from 'mdx/types';
import type { Route } from 'next';

import { Note, Video } from '@/components';
import { Code, CodeBlock, Heading, HorizontalRule, Link, List, Paragraph } from '@/markdown';

type HeadingProps<T extends React.ElementType = 'h1'> = ComponentPropsWithoutRef<T>;

const components = {
  h1: (props: HeadingProps<'h1'>) => <Heading size="h1" {...props} />,
  h2: (props: HeadingProps<'h2'>) => <Heading size="h2" {...props} />,
  h3: (props: HeadingProps<'h3'>) => <Heading size="h3" {...props} />,
  h4: (props: HeadingProps<'h4'>) => <Heading size="h4" {...props} />,
  h5: (props: HeadingProps<'h5'>) => <Heading size="h5" {...props} />,
  h6: (props: HeadingProps<'h6'>) => <Heading size="h6" {...props} />,

  p: (props: ComponentPropsWithoutRef<'p'>) => <Paragraph {...props} />,

  hr: (props: ComponentPropsWithoutRef<'hr'>) => <HorizontalRule {...props} />,

  blockquote: (props: ComponentPropsWithoutRef<'blockquote'>) => <Note {...props} />,

  code: (props: ComponentPropsWithoutRef<'pre'>) => <Code {...props} />,
  pre: ({ children, ...props }: ComponentPropsWithoutRef<'pre'>) => {
    // This type assertion is necessary because the type of children is not always ReactElement
    const codeProps = (children as React.ReactElement).props as React.HTMLProps<HTMLElement>;
    const code = codeProps.children as string;
    const lang = (codeProps.className || '').replace(/language-/, '');

    return (
      <Suspense>
        <CodeBlock code={code} lang={lang} {...props} />
      </Suspense>
    );
  },

  // Disable images in favor of the Image component
  img: () => null,

  ul: (props: ComponentPropsWithoutRef<'ul'>) => <List {...props} />,
  ol: (props: ComponentPropsWithoutRef<'ol'>) => <List ordered {...props} />,

  a: ({ href, ...rest }: ComponentPropsWithoutRef<'a'>) => <Link href={href as Route} {...rest} />,
  Video: (props: ComponentPropsWithoutRef<'video'>) => <Video {...props} />,
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
