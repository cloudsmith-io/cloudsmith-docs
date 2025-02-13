'use client';

import { Icon, IconName } from '@/icons';
import { performSearch } from '@/lib/search/server';
import { SearchResult } from '@/lib/search/types';
import { debounce } from '@/lib/util';
import * as RadixDialog from '@radix-ui/react-dialog';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { cx } from 'class-variance-authority';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import { Tag } from '../Tag';
import { FilterButtons } from './FilterButtons';
import { SearchFooter } from './SearchFooter';
import { SearchForm } from './SearchForm';
import { SearchTrigger } from './SearchTrigger';

import styles from './SearchDialog.module.css';

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
    setFocusedIndex: Dispatch<SetStateAction<number>>,
  ) => {
    const results = await performSearch(term, sections);
    setIsWaiting(false);
    setResults(results);
    setFocusedIndex(0);
  },
  300,
);

export const SearchDialog = () => {
  const [open, setOpen] = useState(false);
  const [term, setTerm] = useState('');
  const [isWaiting, setIsWaiting] = useState(false);
  const [sections, setSections] = useState<Array<Section>>([filters[0].id]);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [focusedIndex, setFocusedIndex] = useState<number>(0);
  const [isKeyboardNav, setIsKeyboardNav] = useState(false);
  const router = useRouter();

  useHotkeys(['meta+k'], () => setOpen(true));

  // Reset keyboard nav when results change
  useEffect(() => {
    setIsKeyboardNav(false);
  }, [results]);

  useEffect(() => {
    if (term === '') {
      setResults([]);
    } else {
      setIsWaiting(true);
      debouncedSearch(term, sections, setIsWaiting, setResults, setFocusedIndex);
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

  const scrollIntoViewIfNeeded = (element: HTMLElement | null) => {
    if (isKeyboardNav && element) {
      element.scrollIntoView({ block: 'nearest' });
    }
  };

  const goUp = () => {
    setIsKeyboardNav(true);
    setFocusedIndex((prev) => {
      if (prev === 0) {
        return results.length - 1;
      }
      return prev - 1;
    });
  };

  const goDown = () => {
    setIsKeyboardNav(true);
    setFocusedIndex((prev) => {
      if (prev === results.length - 1) {
        return 0;
      }
      return prev + 1;
    });
  };

  const goToResult = () => {
    if (focusedIndex !== -1) {
      router.push(results[focusedIndex].path);
      setOpen(false);
    }
  };

  const goToStart = () => {
    setIsKeyboardNav(true);
    setFocusedIndex(0);
  };

  const goToEnd = () => {
    setIsKeyboardNav(true);
    setFocusedIndex(results.length - 1);
  };

  return (
    <RadixDialog.Root open={open} onOpenChange={setOpen}>
      <SearchTrigger />

      <RadixDialog.Portal>
        <RadixDialog.Overlay className={styles.overlay}>
          <RadixDialog.Content className={styles.content}>
            <header className={styles.header}>
              <div className={styles.iconWrapper}>
                <Icon name="search" className={styles.icon} title="" />
              </div>
              <SearchForm
                value={term}
                events={{ onChange: setTerm, goUp, goDown, goToResult, goToStart, goToEnd }}
              />
            </header>

            <VisuallyHidden>
              <RadixDialog.Close asChild>
                <button>Close</button>
              </RadixDialog.Close>
              <RadixDialog.Title className={styles.title}>Search</RadixDialog.Title>
              <RadixDialog.Description>
                Search for documentation, guides, and API reference.
              </RadixDialog.Description>
            </VisuallyHidden>

            <div className={styles.main}>
              <FilterButtons activeSections={sections} onFilterChange={setSection} filters={filters} />

              <ul
                className={styles.results}
                onMouseMove={() => {
                  if (isKeyboardNav) {
                    setIsKeyboardNav(false);
                  }
                }}>
                {results.map((res, index) => (
                  <li key={`${res.path}${res.title}${index}`}>
                    <Link
                      href={res.path}
                      ref={index === focusedIndex ? scrollIntoViewIfNeeded : undefined}
                      onMouseEnter={() => !isKeyboardNav && setFocusedIndex(index)}
                      onClick={() => setOpen(false)}
                      className={cx(styles.resultLink, { [styles.resultLinkFocus]: index === focusedIndex })}>
                      <span className={styles.resultTitle}>
                        {res.title}
                        {res.method && <Tag method={res.method} className={styles.resultTag} />}
                      </span>
                      <span className={styles.resultDescription}>
                        {highlightSearchTerm(res.snippet, term)}
                      </span>
                      <span className={styles.resultEnter}>
                        <Icon name="enter" className={styles.resultEnterIcon} title="" />
                      </span>
                      <Icon name="arrowRight" className={styles.resultArrow} title="" />
                    </Link>
                  </li>
                ))}
              </ul>

              {isWaiting && <p className={styles.noResults}>Loading...</p>}

              {!isWaiting && term === '' && <p className={styles.noResults}>Please enter a search term</p>}

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

const highlightSearchTerm = (text: string, term: string) => {
  if (!term.trim()) {
    return text;
  }

  return text
    .split(new RegExp(`(${term})`, 'gi'))
    .map((part, i) => (part.toLowerCase() === term.toLowerCase() ? <u key={i}>{part}</u> : part));
};

export type Filters = Array<{ id: string; label: string; icon: IconName }>;
type Section = (typeof filters)[number]['id'];
