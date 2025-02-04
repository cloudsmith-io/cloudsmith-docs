'use client';

import { useState } from 'react';
import { Icon, IconName } from '@/icons';

import styles from './ClipboardCopy.module.css';

export function ClipboardCopy({ textToCopy }: { textToCopy: string }) {
  const [copyState, setCopyState] = useState<CopyStatus>('waiting');

  async function copyText() {
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopyState('copied');
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (_) {
      setCopyState('error');
    }

    setTimeout(() => {
      setCopyState('waiting');
    }, 3000);
  }

  return (
    <button type="button" disabled={copyState !== 'waiting'} onClick={copyText} className={styles.button}>
      <Icon
        width={16}
        height={16}
        name={getIconByState[copyState]}
        title={copyState === 'error' ? 'Copy failed' : copyState === 'copied' ? 'Copied!' : ''}
      />
    </button>
  );
}

const getIconByState: Record<CopyStatus, IconName> = {
  copied: 'action/check',
  error: 'action/error',
  waiting: 'action/copy',
};

type CopyStatus = 'copied' | 'error' | 'waiting';
