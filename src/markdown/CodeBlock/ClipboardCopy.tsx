'use client';

import { useState } from 'react';
import { Icon } from '@/icons';

import styles from './ClipboardCopy.module.css';

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
    <button type="button" disabled={isCopied} onClick={copyText} className={styles.button}>
      <Icon name={isCopied ? 'action/check' : 'action/copy'} title="Copy text" />
    </button>
  );
}
