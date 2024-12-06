'use client';

import { useState } from 'react';

import { cx } from 'class-variance-authority';

import { Icon, IconProps } from '@/icons';

import styles from './clipboard-copy.module.css';

// type test = typeof Icon['name']

export function ClipboardCopy({ textToCopy }: { textToCopy: string }) {
  const [isCopied, setIsCopied] = useState(false);

  async function copyText() {
    await navigator.clipboard.writeText(textToCopy);
    setIsCopied(true);

    setTimeout(() => {
      setIsCopied(false);
    }, 3000);
  }

  return (
    <button
      type="button"
      disabled={isCopied}
      onClick={copyText}
      className={cx(styles.button, {
        [styles.copied]: isCopied,
      })}>
      <Icon name="close" title="Copy text" />
    </button>
  );
}
