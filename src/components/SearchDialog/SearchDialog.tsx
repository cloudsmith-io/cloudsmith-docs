import * as RadixDialog from '@radix-ui/react-dialog';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';

import { Icon } from '@/icons';
import { SearchForm } from './SearchForm';
import { SearchTrigger } from './SearchTrigger';

import styles from './SearchDialog.module.css';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { performSearch } from '@/lib/search/server';
import { debounce } from '@/lib/util';
import { SearchResult } from '@/lib/search/types';

const debouncedSearch = debounce(
  async (term: string, sections: string[], setResults: Dispatch<SetStateAction<SearchResult[]>>) => {
    const results = await performSearch(term, sections);
    setResults(results);
  },
  300,
);

export const SearchDialog = () => {
  const [term, setTerm] = useState('');
  const [sections, setSections] = useState(['documentation', 'guides', 'api']);
  const [results, setResults] = useState<SearchResult[]>([]);

  useEffect(() => {
    if (term === '') {
      setResults([]);
    } else {
      debouncedSearch(term, sections, setResults);
    }
  }, [term, sections, setResults]);

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
              <SearchForm value={term} onChange={setTerm} />
            </header>
            <VisuallyHidden>
              <RadixDialog.Close asChild>
                <button>Close</button>
              </RadixDialog.Close>
              <RadixDialog.Title className={styles.title}>Search</RadixDialog.Title>
            </VisuallyHidden>
            <div className={styles.main}>
              {results.map((res) => (
                <div key={res.path}>{res.title}</div>
              ))}
            </div>
          </RadixDialog.Content>
        </RadixDialog.Overlay>
      </RadixDialog.Portal>
    </RadixDialog.Root>
  );
};
