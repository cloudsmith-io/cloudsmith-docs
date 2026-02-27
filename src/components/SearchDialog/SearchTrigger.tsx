import { Trigger } from '@radix-ui/react-dialog';
import { cx } from 'class-variance-authority';
import { usePathname } from 'next/navigation';

import { Icon } from '@/icons';
import { useModifierKey, useShowKeyboardHints } from '@/lib/hooks';

import styles from './SearchTrigger.module.css';

export const SearchTrigger = () => {
  const pathname = usePathname();
  const modifierKey = useModifierKey();
  const showKeyboardHints = useShowKeyboardHints();

  const isHome = pathname === '/';

  return (
    <Trigger aria-label="Search" className={cx(styles.root, isHome && styles.light)}>
      <Icon name="search" className={styles.icon} title="" />
      <div className={cx(styles.content, 'bodyS')}>
        <span>Search</span>
        {showKeyboardHints && (
          <kbd className={styles.kbd}>
            {modifierKey && (
              <abbr title={modifierKey.label} className={'bodyS'}>
                {modifierKey.symbol}
              </abbr>
            )}
            +K
          </kbd>
        )}
      </div>
    </Trigger>
  );
};
