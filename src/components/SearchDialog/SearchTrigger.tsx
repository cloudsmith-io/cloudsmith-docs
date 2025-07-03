import { Trigger } from '@radix-ui/react-dialog';
import { Icon } from '@/icons';
import { cx } from 'class-variance-authority';

import styles from './SearchTrigger.module.css';

export const SearchTrigger = () => {
  return (
    <Trigger aria-label="Search" className={styles.root}>
      <Icon name="search" className={styles.icon} title="" />
      <div className={cx(styles.content, 'bodyS')}>
        <span>Search</span>
        <kbd className={styles.kbd}>
          <abbr title="Command" className={'bodyS'}>
            ⌘
          </abbr>
          K
        </kbd>
      </div>
    </Trigger>
  );
};
