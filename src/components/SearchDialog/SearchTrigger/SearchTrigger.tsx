import type { SearchTriggerVariant } from '../types';

import { Trigger } from '@radix-ui/react-dialog';
import { cx } from 'class-variance-authority';

import { Icon } from '@/icons';

import styles from './SearchTrigger.module.css';

type SearchTriggerTheme = 'light' | 'dark';

interface SearchTriggerProps {
  className?: string;
  theme?: SearchTriggerTheme;
  variant?: SearchTriggerVariant;
}

export const SearchTrigger = ({ className, theme = 'light', variant = 'inline' }: SearchTriggerProps) => (
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
    <span className={styles.kbdHint}>
      <kbd>
        <span className={styles.kbdText}>Ctrl</span>
      </kbd>
      <kbd>
        <span className={styles.kbdText}>K</span>
      </kbd>
    </span>
  </Trigger>
);
