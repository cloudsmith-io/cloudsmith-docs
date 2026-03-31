import { Trigger } from '@radix-ui/react-dialog';

import { Icon } from '@/icons';

import styles from './SearchTrigger.module.css';

interface SearchTriggerProps {
  className?: string;
}

export const SearchTrigger = ({ className }: SearchTriggerProps) => (
  <Trigger aria-label="Search" className={[styles.root, className].filter(Boolean).join(' ')}>
    <Icon name="search" className={styles.icon} title="" />
    <span className={styles.placeholder}>Search</span>
    <span className={styles.kbdHint}>
      <kbd>Ctrl</kbd>
      <kbd>K</kbd>
    </span>
  </Trigger>
);
