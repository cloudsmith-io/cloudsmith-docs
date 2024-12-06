'use client';

import { useState } from 'react';

import { cx } from 'class-variance-authority';
import Image from 'next/image';

import styles from './clipboard-copy.module.css';

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
      <Image alt="Copy text" src="/icons/copy.svg" width={16} height={16} />
    </button>
  );
}
