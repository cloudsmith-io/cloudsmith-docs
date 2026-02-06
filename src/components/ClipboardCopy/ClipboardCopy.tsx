'use client';

import { ReactNode, useState } from 'react';

import { cva } from 'class-variance-authority';

import { Icon, IconName } from '@/icons';

import styles from './ClipboardCopy.module.css';

const clipboard = cva(styles.root, {
  variants: {
    default: {
      true: styles.default,
      false: styles.pre,
    },
  },
});

export function ClipboardCopy({
  className,
  textToCopy,
  iconVariant = 'default',
  children,
}: {
  className?: string;
  textToCopy: string;
  iconVariant?: 'pre' | 'default';
  children?: ReactNode;
}) {
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
    <button
      type="button"
      disabled={copyState !== 'waiting'}
      onClick={copyText}
      className={clipboard({
        className,
        default: iconVariant === 'default',
      })}>
      {children}
      <div className={styles.icon}>
        <Icon
          width={16}
          height={16}
          name={getIconByState[copyState]}
          title={copyState === 'error' ? 'Copy failed' : copyState === 'copied' ? 'Copied!' : ''}
        />
      </div>
    </button>
  );
}

const getIconByState: Record<CopyStatus, IconName> = {
  copied: 'action/check',
  error: 'action/error',
  waiting: 'action/copy',
};

type CopyStatus = 'copied' | 'error' | 'waiting';
