'use client';

import { Icon, IconName } from '@/icons';
import { performSearch } from '@/lib/search/server';
import { SearchResult } from '@/lib/search/types';
import { debounce } from '@/lib/util';
import * as RadixDialog from '@radix-ui/react-dialog';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import Link from 'next/link';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { FilterButtons } from './FilterButtons';
import { SearchFooter } from './SearchFooter';
import { SearchForm } from './SearchForm';
import { SearchTrigger } from './SearchTrigger';

import styles from './SearchDialog.module.css';
import { Tag } from '../Tag';

export const filters: Filters = [
  { id: 'documentation', label: 'Documentation', icon: 'action/documentation' },
  { id: 'guides', label: 'Guides', icon: 'utility/guide' },
  { id: 'api', label: 'API Reference', icon: 'action/api' },
];

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

              <ul className={styles.results}>
                {results.map((res) => (
                  <li key={`${res.path}${res.title}`}>
                    <Link href={res.path} className={styles.resultLink}>
                      <span className={styles.resultTitle}>
                        {res.title} <Tag method="get" className={styles.resultTag} />
                      </span>
                      {/* TODO add <EM> for matching text */}
                      <span className={styles.resultDescription}>Something text here</span>
                      <span className={styles.resultEnter}>
                        <Icon name="enter" className={styles.resultEnterIcon} title="" />
                      </span>
                      <Icon name="arrowRight" className={styles.resultArrow} title="" />
                    </Link>
                  </li>
                ))}
              </ul>

              {!isWaiting && results.length === 0 && term !== '' && (
                <p className={styles.noResults}>No results</p>
              )}
            </div>

            <footer className={styles.footer}>
              <SearchFooter />
            </footer>
          </RadixDialog.Content>
        </RadixDialog.Overlay>
      </RadixDialog.Portal>
    </RadixDialog.Root>
  );
};

export type Filters = Array<{ id: string; label: string; icon: IconName }>;
type Section = (typeof filters)[number]['id'];
