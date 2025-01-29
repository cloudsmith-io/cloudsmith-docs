import * as RadixDialog from '@radix-ui/react-dialog';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';

import { Icon } from '@/icons';
import { SearchForm } from './SearchForm';
import { SearchTrigger } from './SearchTrigger';

import styles from './SearchDialog.module.css';

export const SearchDialog = () => {
  return (
    <RadixDialog.Root>
      <SearchTrigger />
      <RadixDialog.Portal>
        <RadixDialog.Overlay className={styles.overlay}>
          <RadixDialog.Content className={styles.content}>
            <header className={styles.header}>
              <div className={styles.iconWrapper}>
                <Icon name="search" className={styles.icon} title="" />
              </div>
              <SearchForm value="" onChange={() => {}} />
            </header>
            <VisuallyHidden>
              <RadixDialog.Close asChild>
                <button>Close</button>
              </RadixDialog.Close>
              <RadixDialog.Title className={styles.title}>Search</RadixDialog.Title>
            </VisuallyHidden>
            <div className={styles.main}>All the content here</div>
          </RadixDialog.Content>
        </RadixDialog.Overlay>
      </RadixDialog.Portal>
    </RadixDialog.Root>
  );
};
