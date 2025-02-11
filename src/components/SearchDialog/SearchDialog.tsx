'use client';

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
import { cx } from 'class-variance-authority';

/**
 * If the requirements for this become even more sophisticated,
 * or we need to implement client-side fetched anywhere else,
 * we should replace this with useSWR. For now, it's simple and works.
 */
const debouncedSearch = debounce(
  async (
    term: string,
    sections: string[],
    setIsWaiting: Dispatch<SetStateAction<boolean>>,
    setResults: Dispatch<SetStateAction<SearchResult[]>>,
  ) => {
    const results = await performSearch(term, sections);
    setIsWaiting(false);
    setResults(results);
  },
  300,
);

export const SearchDialog = () => {
  const [term, setTerm] = useState('');
  // isWaiting is true when the debounce is active or the search function is actually loading.
  const [isWaiting, setIsWaiting] = useState(false);
  const [sections, setSections] = useState(['documentation']);
  const [results, setResults] = useState<SearchResult[]>([]);

  useEffect(() => {
    if (term === '') {
      setResults([]);
    } else {
      setIsWaiting(true);
      debouncedSearch(term, sections, setIsWaiting, setResults);
    }
  }, [term, sections, setResults]);

  const setSection = (section: string) => {
    setSections((prev) => {
      if (prev.includes(section)) {
        return prev.filter((s) => s !== section);
      }

      return [...prev, section];
    });
  };

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
              <div className={styles.filters}>
                <p className={styles.filtersHeadline}>Search in</p>
                <div className={styles.filtersList}>
                  <button
                    className={cx(styles.filter, {
                      [styles.filterActive]: sections.includes('documentation'),
                    })}
                    onClick={() => setSection('documentation')}>
                    <Icon name="utility/documentation" className={styles.filterIcon} title="" />
                    Documentation
                  </button>
                  <button
                    className={cx(styles.filter, {
                      [styles.filterActive]: sections.includes('guides'),
                    })}
                    onClick={() => setSection('guides')}>
                    <Icon name="utility/guide" className={styles.filterIcon} title="" />
                    Guides
                  </button>
                  <button
                    className={cx(styles.filter, {
                      [styles.filterActive]: sections.includes('api'),
                    })}
                    onClick={() => setSection('api')}>
                    <Icon name="utility/api" className={styles.filterIcon} title="" />
                    API
                  </button>
                </div>
              </div>

              {results.map((res) => (
                <div key={res.path}>{res.title}</div>
              ))}

              {!isWaiting && results.length === 0 && term !== '' && <p>No results</p>}
            </div>
          </RadixDialog.Content>
        </RadixDialog.Overlay>
      </RadixDialog.Portal>
    </RadixDialog.Root>
  );
};
