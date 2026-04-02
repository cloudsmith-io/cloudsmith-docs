'use client';

import { useEffect, useMemo, useState } from 'react';

import type { SearchHit, SearchSource, SearchTriggerVariant } from './types';

import * as RadixDialog from '@radix-ui/react-dialog';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { algoliasearch } from 'algoliasearch';
import { cx } from 'class-variance-authority';
import { InstantSearchNext } from 'react-instantsearch-nextjs';

import styles from './SearchDialog.module.css';
import { SearchDialogContent } from './SearchDialogContent/SearchDialogContent';
import { SearchTrigger } from './SearchTrigger/SearchTrigger';
import {
  dedupeMergedSearchHits,
  normalizeMergedSearchHref,
  normalizeSearchValue,
  SEARCH_SOURCE_FIELD,
} from './utils/searchHitUtils';

const algoliaAppId = process.env.NEXT_PUBLIC_ALGOLIA_APP_ID;
const algoliaApiKey = process.env.NEXT_PUBLIC_ALGOLIA_API_KEY;
const algoliaIndexName = process.env.NEXT_PUBLIC_ALGOLIA_INDEX;

const algoliaDocsIndexName = process.env.NEXT_PUBLIC_ALGOLIA_DOCS_INDEX || 'Docs';
const DEFAULT_HITS_PER_PAGE = 20;
const DOCS_MAX_HITS_PER_PAGE = 40;
const DOCS_TITLE_SUFFIX_PATTERN = /\s*\|\s*cloudsmith docs\s*$/i;

// Guard against missing Algolia credentials to prevent breaking the navbar
const hasAlgoliaCredentials = Boolean(algoliaAppId && algoliaApiKey);

interface SearchRequestParams {
  query?: string;
  hitsPerPage?: number;
  page?: number;
  getRankingInfo?: boolean;
  [key: string]: unknown;
}

interface SearchRequest {
  indexName?: string;
  params?: SearchRequestParams;
}

interface SearchResult {
  hits: SearchHit[];
  nbHits?: number;
  page?: number;
  nbPages?: number;
  hitsPerPage?: number;
  processingTimeMS?: number;
  query?: string;
  params?: string;
}

type SearchTheme = 'light' | 'dark';

interface SearchDialogProps {
  className?: string;
  theme?: SearchTheme;
  triggerTheme?: SearchTheme;
  dialogTheme?: SearchTheme;
  triggerVariant?: SearchTriggerVariant;
  enableKeyboardShortcut?: boolean;
}

const stripDocsTitleSuffix = (value: unknown): unknown => {
  if (typeof value === 'string') return value.replace(DOCS_TITLE_SUFFIX_PATTERN, '').trim();
  if (!value || typeof value !== 'object') return value;

  if (Array.isArray(value)) {
    return value.map((item) => stripDocsTitleSuffix(item));
  }

  return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, stripDocsTitleSuffix(item)]));
};

const normalizeDocsHit = (hit: SearchHit): SearchHit =>
  ({
    ...hit,
    title: stripDocsTitleSuffix(hit?.title),
    name: stripDocsTitleSuffix(hit?.name),
    hierarchy: stripDocsTitleSuffix(hit?.hierarchy),
  }) as SearchHit;

const getRawSearchHitHref = (hit: SearchHit, source: SearchSource): string => {
  if (source === 'docs') {
    return normalizeSearchValue(hit?.url ?? hit?.url_without_anchor);
  }

  return normalizeSearchValue(hit?.slug);
};

const attachSearchSource = (hit: SearchHit, source: SearchSource): SearchHit => {
  const normalizedHit = source === 'docs' ? normalizeDocsHit(hit) : hit;
  const href = getRawSearchHitHref(normalizedHit, source);

  return {
    ...normalizedHit,
    ...(href ? { slug: normalizeMergedSearchHref(href, source) } : null),
    [SEARCH_SOURCE_FIELD]: source,
  };
};

const getRankingScore = (hit: SearchHit): number | null => {
  const score = hit?._rankingInfo?.userScore ?? hit?._rankingInfo?.score;
  return Number.isFinite(score) ? Number(score) : null;
};

const annotateHitsForMerge = (hits: SearchHit[] = [], source: SearchSource) => {
  return hits.map((hit, rank) => ({
    hit: attachSearchSource(hit, source),
    source,
    rank,
  }));
};

const blendHitsByScore = (websiteHits: SearchHit[] = [], docsHits: SearchHit[] = []) => {
  const annotatedWebsiteHits = annotateHitsForMerge(websiteHits, 'website');
  const annotatedDocsHits = annotateHitsForMerge(docsHits, 'docs');

  // Start with docs hits in their original order and only let website hits
  // move ahead when they clearly outrank the current docs result.
  const result = [...annotatedDocsHits];

  for (const websiteHit of annotatedWebsiteHits) {
    const websiteScore = getRankingScore(websiteHit.hit);

    let insertIndex = result.length;
    for (let i = 0; i < result.length; i++) {
      const currentScore = getRankingScore(result[i].hit);

      if (websiteScore != null && currentScore != null && websiteScore > currentScore) {
        insertIndex = i;
        break;
      }
    }

    result.splice(insertIndex, 0, websiteHit);
  }

  return result.map(({ hit }) => hit);
};

const mergeMultiIndexResults = (
  websiteResult: SearchResult | undefined,
  docsResult: SearchResult | undefined,
  request: SearchRequest,
): SearchResult => {
  const requestedHitsPerPage = Number(
    request?.params?.hitsPerPage ?? websiteResult?.hitsPerPage ?? DEFAULT_HITS_PER_PAGE,
  );
  const effectiveHitsPerPage = Number.isFinite(requestedHitsPerPage)
    ? Math.max(1, requestedHitsPerPage)
    : DEFAULT_HITS_PER_PAGE;
  const websiteHits = websiteResult?.hits || [];
  const docsHits = docsResult?.hits || [];
  const mergedHits = dedupeMergedSearchHits(blendHitsByScore(websiteHits, docsHits)).slice(
    0,
    effectiveHitsPerPage,
  );

  return {
    ...(websiteResult || {}),
    hits: mergedHits,
    hitsPerPage: effectiveHitsPerPage,
    nbHits: (websiteResult?.nbHits || 0) + (docsResult?.nbHits || 0),
    nbPages: Math.max(websiteResult?.nbPages || 0, docsResult?.nbPages || 0),
    processingTimeMS: (websiteResult?.processingTimeMS || 0) + (docsResult?.processingTimeMS || 0),
    query: websiteResult?.query || docsResult?.query || request?.params?.query || '',
    params: websiteResult?.params || docsResult?.params || '',
  };
};

const getHitsPerPageFromRequest = (request: SearchRequest, fallback = DEFAULT_HITS_PER_PAGE) => {
  const requestedHitsPerPage = Number(request?.params?.hitsPerPage ?? fallback);
  if (!Number.isFinite(requestedHitsPerPage)) return fallback;

  return Math.max(1, requestedHitsPerPage);
};

const shouldRequestRankingInfo = (request: SearchRequest) => {
  const query = normalizeSearchValue(request?.params?.query);
  if (!query) return false;

  // Ranking metadata is only used for blending on the first page
  const page = Number(request?.params?.page ?? 0);
  if (Number.isFinite(page) && page > 0) return false;

  return getHitsPerPageFromRequest(request) > 0;
};

// Create a resilient search client that handles connection errors
const createSearchClient = (onError: (message: string | null) => void) => {
  const buildEmptyResult = (request: SearchRequest): SearchResult => ({
    hits: [],
    nbHits: 0,
    page: 0,
    nbPages: 0,
    hitsPerPage: request?.params?.hitsPerPage || DEFAULT_HITS_PER_PAGE,
    processingTimeMS: 0,
    query: request?.params?.query || '',
    params: '',
  });

  const isEmptySearchRequest = (request: SearchRequest) => {
    return normalizeSearchValue(request?.params?.query).length === 0;
  };

  const client = algoliasearch(algoliaAppId!, algoliaApiKey!);
  const websiteIndexName = algoliaIndexName || '';

  // Wrap the search method to handle connection errors gracefully
  return {
    ...client,
    search: async (requests: SearchRequest[]) => {
      const normalizedRequests = Array.isArray(requests) ? requests : [];
      if (normalizedRequests.length === 0) return { results: [] };

      // Never send empty/whitespace-only queries to Algolia.
      if (normalizedRequests.every(isEmptySearchRequest)) {
        onError(null);

        return {
          results: normalizedRequests.map((request) => buildEmptyResult(request)),
        };
      }

      const websiteRequests = normalizedRequests.map((request) => ({
        ...request,
        indexName: request?.indexName || websiteIndexName,
        params: {
          ...(request?.params || {}),
          ...(shouldRequestRankingInfo(request) ? { getRankingInfo: true } : {}),
        },
      }));

      const docsRequests = normalizedRequests.map((request) => {
        const includeRankingInfo = shouldRequestRankingInfo(request);

        return {
          ...request,
          indexName: algoliaDocsIndexName,
          params: {
            ...(request?.params || {}),
            hitsPerPage: Math.min(
              getHitsPerPageFromRequest(request, DOCS_MAX_HITS_PER_PAGE),
              DOCS_MAX_HITS_PER_PAGE,
            ),
            ...(includeRankingInfo ? { getRankingInfo: true } : {}),
          },
        };
      });

      try {
        const result = (await client.search([...websiteRequests, ...docsRequests] as never)) as {
          results: SearchResult[];
        };

        const mergedResults = normalizedRequests.map((request, index) => {
          const websiteResult = result?.results?.[index];
          const docsResult = result?.results?.[index + normalizedRequests.length];

          return mergeMultiIndexResults(websiteResult, docsResult, request);
        });

        // Clear any previous errors on successful search
        onError(null);
        return { results: mergedResults };
      } catch (error) {
        // Log the error for debugging
        const errorMessage = error instanceof Error ? error.message : String(error);
        console.warn('Algolia search failed:', errorMessage);

        // Set error state for UI display
        onError('Search is currently unavailable. Please try again later.');

        // Return empty results that match the expected structure
        return {
          results: normalizedRequests.map((request) => buildEmptyResult(request)),
        };
      }
    },
  } as typeof client;
};

export const SearchDialog = ({
  className,
  theme: themeOverride,
  triggerTheme,
  dialogTheme,
  triggerVariant = 'inline',
  enableKeyboardShortcut = true,
}: SearchDialogProps) => {
  const [open, setOpen] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);
  const [theme, setTheme] = useState(() => {
    if (typeof document === 'undefined') {
      return 'undefined';
    }

    return document.body.dataset.theme || 'undefined';
  });
  // Open dialog with Cmd+K
  useEffect(() => {
    if (!enableKeyboardShortcut) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setOpen(true);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [enableKeyboardShortcut]);

  // Watch for theme changes on body element
  useEffect(() => {
    const observer = new MutationObserver(() => {
      const newTheme = document.body.dataset.theme || 'undefined';
      setTheme(newTheme);
    });

    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });

    return () => observer.disconnect();
  }, []);

  const fallbackTheme: SearchTheme = themeOverride || (theme === 'dark' ? 'dark' : 'light');
  const effectiveTriggerTheme: SearchTheme = triggerTheme || fallbackTheme;
  const effectiveDialogTheme: SearchTheme = dialogTheme || fallbackTheme;

  const overlayClasses = cx(styles.overlay, {
    [styles.themeLight]: effectiveDialogTheme === 'light',
    [styles.themeDark]: effectiveDialogTheme === 'dark',
  });

  const contentClasses = cx(styles.content, {
    [styles.themeLight]: effectiveDialogTheme === 'light',
    [styles.themeDark]: effectiveDialogTheme === 'dark',
  });

  // Create search client with error handler
  const searchClient = useMemo(() => (hasAlgoliaCredentials ? createSearchClient(setSearchError) : null), []);
  if (!hasAlgoliaCredentials || !searchClient) return null;

  return (
    <RadixDialog.Root open={open} onOpenChange={setOpen}>
      <SearchTrigger className={className} theme={effectiveTriggerTheme} variant={triggerVariant} />

      <RadixDialog.Portal>
        <RadixDialog.Overlay className={overlayClasses}>
          <VisuallyHidden>
            <RadixDialog.Title>Search</RadixDialog.Title>
          </VisuallyHidden>
          <RadixDialog.Content className={contentClasses}>
            <InstantSearchNext indexName={algoliaIndexName} searchClient={searchClient} insights>
              <SearchDialogContent onClose={() => setOpen(false)} searchError={searchError} />
            </InstantSearchNext>
          </RadixDialog.Content>
        </RadixDialog.Overlay>
      </RadixDialog.Portal>
    </RadixDialog.Root>
  );
};
