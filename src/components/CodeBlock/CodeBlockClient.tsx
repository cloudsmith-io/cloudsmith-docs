'use client';

import { useLayoutEffect, useState } from 'react';

import { transformerNotationHighlight } from '@shikijs/transformers';
import { cva, cx } from 'class-variance-authority';
import { Highlighter } from 'shiki/index.mjs';

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
    isError: {
      true: styles.error,
    },
  },
});

async function codeToHtml(code: string, lang: string, highlighter: Highlighter) {
  return highlighter?.codeToHtml(code, {
    lang,
    theme,
    transformers: [
      // Add more transformers when needed from https://shiki.style/packages/transformers
      transformerNotationHighlight({ matchAlgorithm: 'v3' }),
    ],
  });
}

export default function CodeBlockClient({
  variant = 'default',
  children,
  lang,
  header,
  hideHeader: _hideHeader = false,
  className,
  isError = false,
  copyContentOverride,
}: Props & { isError?: boolean; copyContentOverride?: string }) {
  const hideHeader = (!lang && !header) || _hideHeader;
  const hideLineNumbers = lang === 'bash' || lang === 'text';
  const darkerBackground = variant === 'darker';

  const [html, setHtml] = useState<string | null>();
  const [parsing, setParsing] = useState<boolean>(false);
  const { highlighter, isError: highlightError, isFetching } = useHighlighter();

  useLayoutEffect(() => {
    if (highlighter) {
      setParsing(true);
      codeToHtml(children, lang, highlighter)
        .then(setHtml)
        .finally(() => setParsing(false));
    }
  }, [children, highlighter, lang]);

  return (
    <div
      className={codeBlock({
        hideHeader,
        hideLineNumbers,
        darkerBackground,
        isError: isError || highlightError,
        className,
      })}>
      {!hideHeader && (
        <div className={styles.lang}>
          <div className={cx({ [styles.langText]: !header && lang }, 'monoXSUppercase')}>
            {header ?? lang}
          </div>
          <ClipboardCopy textToCopy={copyContentOverride ?? children} iconVariant="pre" />
        </div>
      )}

      <div className={styles.codeWrapper}>
        {highlightError && (
          <div className={styles.code}>
            <pre className={styles.pre}>Something went wrong while rendering code block.</pre>
          </div>
        )}

        {!html && (parsing || isFetching) && (
          <div className={styles.code}>
            <pre className={styles.pre}>Loading...</pre>
          </div>
        )}

        {html && <div className={styles.code} dangerouslySetInnerHTML={{ __html: html }} />}
      </div>
    </div>
  );
}
