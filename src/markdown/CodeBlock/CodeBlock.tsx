import { transformerNotationHighlight } from '@shikijs/transformers';
import { cva } from 'class-variance-authority';

import { highlighter, theme } from '@/lib/highlight';

import { ClipboardCopy } from './ClipboardCopy';

import styles from './CodeBlock.module.css';

const codeBlock = cva(styles.root, {
  variants: {
    hideLineNumbers: {
      false: styles.withLineNumbers,
    },
  },
});

export async function CodeBlock({ code, lang }: Props) {
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
      <div className={styles.lang}>
        <div className={styles.langText}>{lang}</div>
        <ClipboardCopy textToCopy={code} />
      </div>

      <div className={styles.code} dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
}

interface Props {
  code: string;
  lang: string;
}
