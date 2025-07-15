import { transformerNotationHighlight } from '@shikijs/transformers';
import { cva, cx } from 'class-variance-authority';

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

export async function CodeBlock({ children, lang, header = true }: Props) {
  const hideHeader = !lang || !header;
  const hideLineNumbers = lang === 'bash' || lang === 'text';

  const html = (await getHighlighter()).codeToHtml(children, {
    lang,
    theme,
    transformers: [
      // Add more transformers when needed from https://shiki.style/packages/transformers
      transformerNotationHighlight({ matchAlgorithm: 'v3' }),
    ],
  });

  return (
    <div className={codeBlock({ hideHeader, hideLineNumbers })}>
      {!hideHeader && (
        <div className={styles.lang}>
          <div className={cx(styles.langText, 'monoXSUppercase')}>{lang}</div>
          <ClipboardCopy textToCopy={children} />
        </div>
      )}
      <div className={styles.code} dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
}

interface Props {
  children: string;
  lang: string;
  header?: boolean;
}
