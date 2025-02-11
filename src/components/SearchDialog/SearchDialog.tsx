'use client';

import { Icon, IconName } from '@/icons';
import { performSearch } from '@/lib/search/server';
import { SearchResult } from '@/lib/search/types';
import { debounce } from '@/lib/util';
import * as RadixDialog from '@radix-ui/react-dialog';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { FilterButtons } from './FilterButtons';
import { SearchForm } from './SearchForm';
import { SearchTrigger } from './SearchTrigger';

import styles from './SearchDialog.module.css';

export const filters: Array<{ id: string; label: string; icon: IconName }> = [
  { id: 'documentation', label: 'Documentation', icon: 'action/documentation' },
  { id: 'guides', label: 'Guides', icon: 'utility/guide' },
  { id: 'api', label: 'API', icon: 'action/api' },
];

type Section = (typeof filters)[number]['id'];

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
  const [sections, setSections] = useState<Array<Section>>([filters[0].id]);
  const [results, setResults] = useState<SearchResult[]>([]);

  useEffect(() => {
    if (term === '') {
      setResults([]);
    } else {
      setIsWaiting(true);
      debouncedSearch(term, sections, setIsWaiting, setResults);
    }
  }, [term, sections, setResults]);

  const setSection = (section: Section) => {
    setSections((prev) => {
      if (prev.includes(section)) {
        // Don't remove if it would leave no sections
        if (prev.length === 1) {
          return prev;
        }

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
              <FilterButtons activeSections={sections} onFilterChange={setSection} filters={filters} />

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
