import { cva } from 'class-variance-authority';

import { highlighter } from '@/lib/highlight';

import styles from './code-block.module.css';

const codeBlock = cva(styles.root, {
  variants: {
    // language: {
    //   // h1: 'test',
    // },
  },
  // defaultVariants: {
  // },
});

export async function CodeBlock({ code, filename, lang }: Code.Props) {
  'use cache';

  const html = (await highlighter).codeToHtml(code, {
    theme: 'github-dark',
    lang,
  });

  return (
    <div className={codeBlock()}>
      <h2>{filename}</h2>
      <h3>{lang}</h3>
      <div className="wrapper" dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
}

export namespace Code {
  // type VariantsProps = VariantProps<typeof codeBlock>;

  export interface Props extends React.ComponentPropsWithoutRef<'pre'> {
    // Omit<VariantsProps, 'language'>,
    // Required<Pick<VariantsProps, 'language'>>
    code: string;
    filename?: string;
    hideLineNumbers?: boolean;
    lang: string;
  }
}
