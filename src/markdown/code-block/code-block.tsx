import { transformerNotationHighlight } from '@shikijs/transformers';
import { cva } from 'class-variance-authority';

import { highlighter, theme } from '@/lib/highlight';

import styles from './code-block.module.css';

const codeBlock = cva(styles.root, {
  variants: {
    hideLineNumbers: {
      false: styles.withLineNumbers,
    },
  },
});

export async function CodeBlock({ code, lang }: Code.Props) {
  'use cache';

  const hideLineNumbers = lang === 'bash' || lang === 'text';
  const html = (await highlighter).codeToHtml(code, {
    lang,
    theme,
    transformers: [
      // Add more transformers when needed from https://shiki.style/packages/transformers
      transformerNotationHighlight(),
    ],
  });

  return (
    <div className={codeBlock({ hideLineNumbers })}>
      <div className={styles.lang}>{lang}</div>
      <div className={styles.code} dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
}

export namespace Code {
  export interface Props extends React.ComponentPropsWithoutRef<'pre'> {
    code: string;
    lang: string;
  }
}
