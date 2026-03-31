'use client';

import { useCallback, useEffect, useRef } from 'react';

import type { SearchHit } from '../types';

import { Configure, SearchBox, useInstantSearch, useSearchBox } from 'react-instantsearch';

import { Icon } from '@/icons';

import styles from './SearchDialogContent.module.css';
import { SearchFilters } from './SearchFilters/SearchFilters';
import { SearchResults } from './SearchResults/SearchResults';

interface SearchDialogContentProps {
  onClose: () => void;
  searchError: string | null;
}

export const SearchDialogContent = ({ onClose, searchError }: SearchDialogContentProps) => {
  const { results, status } = useInstantSearch();
  const { query } = useSearchBox();
  const debounceRef = useRef<number | null>(null);
  const trimmedQuery = query?.trim() || '';
  const displayedHits = (results?.hits as SearchHit[] | undefined) || [];
  const settledQuery = results?.query?.trim?.() || '';
  const showReset = trimmedQuery.length > 0;
  const isSearching = status === 'loading' || status === 'stalled';
  const showResultsLayout = trimmedQuery.length > 0;

  const queryHook = useCallback((nextQuery: string, search: (value: string) => void) => {
    const trimmed = nextQuery.trim();

    if (trimmed.length === 0) {
      if (debounceRef.current) window.clearTimeout(debounceRef.current);
      search('');
      return;
    }

    if (trimmed.length < 2) return;
    if (debounceRef.current) window.clearTimeout(debounceRef.current);

    debounceRef.current = window.setTimeout(() => {
      search(nextQuery);
    }, 150);
  }, []);

  useEffect(
    () => () => {
      if (debounceRef.current) window.clearTimeout(debounceRef.current);
    },
    [],
  );

  return (
    <>
      <header className={styles.header}>
        <div className={styles.iconWrapper}>
          <Icon name="search" className={styles.icon} title="" />
        </div>
        <SearchBox
          placeholder="Search for items..."
          queryHook={queryHook}
          resetIconComponent={() => <Icon name="action/close" className={styles.resetIcon} title="" />}
          loadingIconComponent={() => null}
          autoFocus
          classNames={{
            root: styles.searchBox,
            input: styles.searchBoxInput,
            form: styles.searchBoxForm,
            submit: styles.searchBoxSubmit,
            reset: `${styles.searchBoxReset} ${
              showReset ? styles.searchBoxResetVisible : styles.searchBoxResetHidden
            }`,
          }}
        />
        <span className={styles.kbdBadge}>
          <kbd>esc</kbd>
        </span>
      </header>

      <Configure hitsPerPage={200} />
      <div className={showResultsLayout ? styles.resultsWrapper : ''}>
        <SearchFilters hits={displayedHits} query={trimmedQuery} />
        <SearchResults
          hits={displayedHits}
          isSearching={isSearching}
          onClose={onClose}
          query={trimmedQuery}
          searchError={searchError}
          settledQuery={settledQuery}
        />
      </div>
    </>
  );
};
