import { transformerNotationHighlight } from '@shikijs/transformers';
import { cva } from 'class-variance-authority';

import { getHighlighter, theme } from '@/lib/highlight';

import { ClipboardCopy } from './ClipboardCopy';

import styles from './CodeBlock.module.css';

const codeBlock = cva(styles.root, {
  variants: {
    hideLineNumbers: {
      false: styles.withLineNumbers,
    },
    hideHeader: {
      true: styles.hideHeader,
    },
  },
});

export async function CodeBlock({ code, lang, header }: Props) {
  // Remove trailing newline if present
  let trimmedCode = code;
  if (code.endsWith('\n')) {
    trimmedCode = code.slice(0, -1);
  }

  const hideHeader = !lang || !header;
  const hideLineNumbers = lang === 'bash' || lang === 'text';
  const html = (await getHighlighter()).codeToHtml(trimmedCode, {
    lang,
    theme,
    transformers: [
      // Add more transformers when needed from https://shiki.style/packages/transformers
      transformerNotationHighlight({ matchAlgorithm: 'v3' }),
    ],
  });

  return (
    <div className={codeBlock({ hideHeader, hideLineNumbers })}>
      <div className={styles.lang}>
        <div className={styles.langText}>{lang}</div>
        <ClipboardCopy textToCopy={trimmedCode} />
      </div>
      <div className={styles.code} dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
}

interface Props {
  code: string;
  lang: string;
  header: boolean;
}
