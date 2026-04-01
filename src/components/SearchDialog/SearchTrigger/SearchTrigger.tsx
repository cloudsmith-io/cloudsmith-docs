import { Trigger } from '@radix-ui/react-dialog';

import { Icon } from '@/icons';

import styles from './SearchTrigger.module.css';

type SearchTriggerTheme = 'light' | 'dark';

interface SearchTriggerProps {
  className?: string;
  theme?: SearchTriggerTheme;
}

export const SearchTrigger = ({ className, theme = 'light' }: SearchTriggerProps) => (
  <Trigger
    aria-label="Search"
    className={[styles.root, theme === 'dark' ? styles.themeDark : styles.themeLight, className]
      .filter(Boolean)
      .join(' ')}>
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
