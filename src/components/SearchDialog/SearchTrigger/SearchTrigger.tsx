'use client';

import type { SearchTriggerVariant } from '../types';

import { Trigger } from '@radix-ui/react-dialog';
import { cx } from 'class-variance-authority';

import { Icon } from '@/icons';
import { useModifierKey, useShowKeyboardHints } from '@/lib/hooks';

import styles from './SearchTrigger.module.css';

type SearchTriggerTheme = 'light' | 'dark';

interface SearchTriggerProps {
  className?: string;
  theme?: SearchTriggerTheme;
  variant?: SearchTriggerVariant;
}

export const SearchTrigger = ({ className, theme = 'light', variant = 'inline' }: SearchTriggerProps) => {
  const modifierKey = useModifierKey();
  const showHints = useShowKeyboardHints();

  return (
    <Trigger
      aria-label="Search"
      className={cx(
        styles.root,
        theme === 'dark' ? styles.themeDark : styles.themeLight,
        styles[variant],
        className,
      )}>
      <Icon name="search" className={styles.icon} title="" />
      <span className={styles.placeholder}>Search</span>
      {showHints && modifierKey && (
        <span className={styles.kbdHint}>
          <kbd>
            <span className={styles.kbdText}>{modifierKey.symbol.replace('+', '')}</span>
          </kbd>
          <kbd>
            <span className={styles.kbdText}>K</span>
          </kbd>
        </span>
      )}
    </Trigger>
  );
};
