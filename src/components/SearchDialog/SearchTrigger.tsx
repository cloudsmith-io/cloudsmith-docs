import { Trigger } from '@radix-ui/react-dialog';
import { Icon } from '@/icons';

import styles from './SearchTrigger.module.css';

export const SearchTrigger = () => {
  return (
    <Trigger aria-label="Search" className={styles.root}>
      <Icon name="search" className={styles.icon} title="" />
      <div className={styles.content}>
        <span>Search</span>
        <kbd className={styles.kbd}>
          <abbr title="Command">⌘</abbr> K
        </kbd>
      </div>
    </Trigger>
  );
};
