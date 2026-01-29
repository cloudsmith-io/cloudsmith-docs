'use client';

import { transformerNotationHighlight } from '@shikijs/transformers';
import { cva, cx } from 'class-variance-authority';

import { useHighlighter } from '@/lib/highlight/client';
import { theme } from '@/lib/highlight/theme';

import { ClipboardCopy } from '../ClipboardCopy/ClipboardCopy';
import styles from './CodeBlock.module.css';
import { Props } from './props';

const codeBlock = cva(styles.root, {
  variants: {
    hideLineNumbers: {
      false: styles.withLineNumbers,
    },
    hideHeader: {
      true: styles.hideHeader,
    },
    darkerBackground: {
      true: styles.darker,
    },
  },
});

export function CodeBlockSync({
  variant = 'default',
  children,
  lang,
  header,
  hideHeader: _hideHeader = false,
  className,
}: Props) {
  const hideHeader = (!lang && !header) || _hideHeader;
  const hideLineNumbers = lang === 'bash' || lang === 'text';
  const darkerBackground = variant === 'darker';

  const { highlighter, isFetching, isError } = useHighlighter();

  const html = highlighter?.codeToHtml(children, {
    lang,
    theme,
    transformers: [
      // Add more transformers when needed from https://shiki.style/packages/transformers
      transformerNotationHighlight({ matchAlgorithm: 'v3' }),
    ],
  });

  return (
    <div className={codeBlock({ hideHeader, hideLineNumbers, darkerBackground, className })}>
      {!hideHeader && (
        <div className={styles.lang}>
          <div className={cx({ [styles.langText]: !header && lang }, 'monoXSUppercase')}>
            {header ?? lang}
          </div>
          <ClipboardCopy textToCopy={children} iconVariant="pre" />
        </div>
      )}

      {isFetching && <div className={styles.loading}>Loading code block</div>}

      {isError && <div className={styles.error}>Something went wrong while rendering code block</div>}

      {html && <div className={styles.code} dangerouslySetInnerHTML={{ __html: html }} />}
    </div>
  );
}
