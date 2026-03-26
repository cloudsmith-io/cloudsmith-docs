import { Trigger } from '@radix-ui/react-dialog';
import { cx } from 'class-variance-authority';

import { Icon } from '@/icons';

import styles from './SearchTrigger.module.css';

export const SearchTrigger = ({ className }) => (
  <Trigger aria-label="Search" className={cx(styles.root, className)}>
    <Icon name="search" className={styles.icon} title="" />
    <div className={styles.content}>
      <span>Search</span>
    </div>
  </Trigger>
);
