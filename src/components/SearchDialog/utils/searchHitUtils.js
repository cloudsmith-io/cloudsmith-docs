import { quickNavIgnoredAnchorFragments } from '@/lib/constants/quickNav';
import { slugify, titleCase } from '@/util/strings';
import { isExternalHref } from '@/util/url';

const DOCS_SITE_ORIGIN = process.env.NEXT_PUBLIC_DOCS_SITE_ORIGIN || 'https://docs.cloudsmith.com';
const MARKETING_SITE_ORIGIN = process.env.NEXT_PUBLIC_MARKETING_SITE_ORIGIN || 'https://cloudsmith.com';
const DOCS_SITE_URL = new URL(DOCS_SITE_ORIGIN);
const MARKETING_SITE_URL = new URL(MARKETING_SITE_ORIGIN);
const SEARCH_SOURCE_FIELD = 'searchSource';
const DOCS_SEARCH_SOURCE = 'docs';
const WEBSITE_SEARCH_SOURCE = 'website';
const DOCS_BREADCRUMB_LABEL = 'Documentation';
const DOCS_HIERARCHY_LEVEL_KEYS = ['lvl6', 'lvl5', 'lvl4', 'lvl3', 'lvl2', 'lvl1', 'lvl0'];
const HTTP_METHODS = new Set(['delete', 'get', 'head', 'options', 'patch', 'post', 'put', 'trace']);

const normalizeSearchValue = (value) => (typeof value === 'string' ? value.trim() : '');

const normalizeComparableSearchValue = (value) => {
  const normalizedValue = normalizeSearchValue(value);
  if (!normalizedValue) return '';

  return slugify(decodeURIComponent(normalizedValue).replace(/\+/g, ' '));
};

const getHitHref = (hit) => normalizeSearchValue(hit?.slug);

const decodeSearchValue = (value) => {
  const normalizedValue = normalizeSearchValue(value);
  if (!normalizedValue) return '';

  try {
    return decodeURIComponent(normalizedValue);
  } catch {
    return normalizedValue;
  }
};

const getReadableAnchorTitle = (value) => {
  const decodedValue = decodeSearchValue(value);
  if (!decodedValue) return '';

  return titleCase(decodedValue.replace(/[-_]+/g, ' '));
};

const getDocsPageDisplayTitle = (hit) => {
  const pageDisplayTitle = normalizeSearchValue(hit?.title) || normalizeSearchValue(hit?.name);
  const normalizedPageDisplayTitle = normalizeComparableSearchValue(pageDisplayTitle);
  const sectionTitle = normalizeComparableSearchValue(getDocsSectionSlug(hit));
  const pageSlugTitle = normalizeSearchValue(getReadableDocsPageSlug(hit));
  const normalizedPageSlugTitle = normalizeComparableSearchValue(pageSlugTitle);

  if (
    pageDisplayTitle &&
    normalizedPageDisplayTitle !== normalizeComparableSearchValue(DOCS_BREADCRUMB_LABEL) &&
    (normalizedPageDisplayTitle !== sectionTitle || normalizedPageSlugTitle === sectionTitle)
  ) {
    return pageDisplayTitle;
  }

  const hierarchyLevels = ['lvl1', 'lvl2', 'lvl3', 'lvl4', 'lvl5', 'lvl6'];

  for (const levelKey of hierarchyLevels) {
    const candidate = normalizeSearchValue(hit?.hierarchy?.[levelKey]);
    if (!candidate) continue;

    const normalizedCandidate = normalizeComparableSearchValue(candidate);

    if (normalizedCandidate === normalizeComparableSearchValue(DOCS_BREADCRUMB_LABEL)) {
      continue;
    }
    if (
      normalizedCandidate === sectionTitle &&
      normalizedPageSlugTitle &&
      normalizedPageSlugTitle !== sectionTitle
    ) {
      continue;
    }

    return candidate;
  }

  if (pageSlugTitle && normalizedPageSlugTitle !== sectionTitle) {
    return pageSlugTitle;
  }

  const pageTitleFromSlug =
    getDocsBreadcrumbScope(hit) === 'documentation' ? getDocsSectionSlug(hit) : pageSlugTitle;

  return normalizeSearchValue(pageTitleFromSlug);
};

const getDocsAnchorTitle = (hit) => {
  const pageDisplayTitle = getDocsPageDisplayTitle(hit);
  const pageTitle = normalizeComparableSearchValue(pageDisplayTitle);
  const sectionTitle = normalizeComparableSearchValue(getDocsSectionSlug(hit));
  const anchorFragment = normalizeComparableSearchValue(getDocsAnchorFragment(hit));
  const pageSlugSegment = normalizeComparableSearchValue(getDocsPageSlugSegment(hit));

  if (isIgnoredDocsAnchorFragment(getDocsAnchorFragment(hit))) return '';

  if (
    pageDisplayTitle &&
    anchorFragment &&
    (anchorFragment === pageTitle || anchorFragment === pageSlugSegment)
  ) {
    return pageDisplayTitle;
  }

  for (const levelKey of DOCS_HIERARCHY_LEVEL_KEYS) {
    const candidate = normalizeSearchValue(hit?.hierarchy?.[levelKey]);
    if (!candidate) continue;

    if (normalizeComparableSearchValue(candidate) === normalizeComparableSearchValue(DOCS_BREADCRUMB_LABEL)) {
      continue;
    }
    if (pageTitle && normalizeComparableSearchValue(candidate) === pageTitle) continue;
    if (sectionTitle && normalizeComparableSearchValue(candidate) === sectionTitle) continue;

    return candidate;
  }

  const anchorTitle = getReadableAnchorTitle(getDocsAnchorFragment(hit));
  if (!anchorTitle) return '';

  if (pageTitle && normalizeComparableSearchValue(anchorTitle) === pageTitle) return '';

  return anchorTitle;
};

const getHitTitle = (hit) => {
  if (normalizeSearchValue(hit?.[SEARCH_SOURCE_FIELD]) === DOCS_SEARCH_SOURCE) {
    if (getHitHref(hit).includes('#')) {
      const anchorTitle = getDocsAnchorTitle(hit);
      if (anchorTitle) return anchorTitle;
    }

    const pageDisplayTitle = getDocsPageDisplayTitle(hit);
    if (pageDisplayTitle) return pageDisplayTitle;
  }

  return (
    normalizeSearchValue(hit?.title) ||
    normalizeSearchValue(hit?.name) ||
    normalizeSearchValue(hit?.hierarchy?.lvl2) ||
    normalizeSearchValue(hit?.hierarchy?.lvl1) ||
    normalizeSearchValue(hit?.hierarchy?.lvl0)
  );
};

const getHitType = (hit) =>
  normalizeSearchValue(hit?._type ?? hit?.type ?? hit?.documentType ?? hit?.docType);

const getHitMethod = (hit) => {
  const method = normalizeSearchValue(hit?.method).toLowerCase();

  return HTTP_METHODS.has(method) ? method : '';
};

const getRelativeDocsHref = (href) => {
  const normalizedHref = normalizeSearchValue(href);
  if (!isExternalHref(normalizedHref)) return normalizedHref;

  try {
    const url = new URL(normalizedHref);
    if (url.origin !== DOCS_SITE_URL.origin) return normalizedHref;

    return `${url.pathname}${url.search}${url.hash}` || '/';
  } catch {
    return normalizedHref;
  }
};

const getDocsPageHref = (hit) => {
  const urlWithoutAnchor = normalizeSearchValue(hit?.url_without_anchor);
  const href = urlWithoutAnchor || getHitHref(hit);
  const normalizedHref = getRelativeDocsHref(href);
  if (!normalizedHref) return '';

  try {
    const url = new URL(normalizedHref, DOCS_SITE_URL);
    return `${url.pathname}${url.search}` || '/';
  } catch {
    return normalizedHref.split('#')[0];
  }
};

const getDocsAnchorFragment = (hit) => {
  const href = getHitHref(hit);
  if (!href) return '';

  try {
    return new URL(href, DOCS_SITE_URL).hash.replace(/^#/, '');
  } catch {
    const hashIndex = href.indexOf('#');
    return hashIndex >= 0 ? href.slice(hashIndex + 1) : '';
  }
};

const isIgnoredDocsAnchorFragment = (value) => {
  const anchorFragment = normalizeSearchValue(value);
  if (!anchorFragment) return false;

  return quickNavIgnoredAnchorFragments.has(anchorFragment);
};

const isIgnoredDocsAnchorHit = (hit) => {
  if (normalizeSearchValue(hit?.[SEARCH_SOURCE_FIELD]) !== DOCS_SEARCH_SOURCE) return false;

  return isIgnoredDocsAnchorFragment(getDocsAnchorFragment(hit));
};

const getDocsPageSlugSegment = (hit) => {
  const pageHref = getDocsPageHref(hit);
  if (!pageHref) return '';

  try {
    const pathnameSegments = new URL(pageHref, DOCS_SITE_URL).pathname.split('/').filter(Boolean);
    return pathnameSegments.at(-1) || '';
  } catch {
    return pageHref.split('#')[0].split('/').filter(Boolean).at(-1) || '';
  }
};

const getReadableDocsPageSlug = (hit) => {
  const pageSlugSegment = decodeSearchValue(getDocsPageSlugSegment(hit));
  if (!pageSlugSegment) return '';

  return titleCase(pageSlugSegment);
};

const isDocsAnchorHit = (hit) => {
  if (normalizeSearchValue(hit?.[SEARCH_SOURCE_FIELD]) !== DOCS_SEARCH_SOURCE) return false;

  return getHitHref(hit).includes('#');
};

const isDocsPageEquivalentAnchorHit = (anchorHit, pageHit) => {
  if (normalizeSearchValue(anchorHit?.[SEARCH_SOURCE_FIELD]) !== DOCS_SEARCH_SOURCE) return false;
  if (normalizeSearchValue(pageHit?.[SEARCH_SOURCE_FIELD]) !== DOCS_SEARCH_SOURCE) return false;

  const anchorHref = getHitHref(anchorHit);
  if (!anchorHref.includes('#')) return false;

  const anchorTitle = normalizeComparableSearchValue(getHitTitle(anchorHit));
  const pageTitle = normalizeComparableSearchValue(getHitTitle(pageHit));
  if (anchorTitle && pageTitle && anchorTitle === pageTitle) return true;

  const anchorFragment = normalizeComparableSearchValue(getDocsAnchorFragment(anchorHit));
  const pageSlugSegment = normalizeComparableSearchValue(getDocsPageSlugSegment(pageHit));

  return Boolean(anchorFragment && pageSlugSegment && anchorFragment === pageSlugSegment);
};

const dedupeMergedSearchHits = (hits = []) => {
  const docsPageHitsByHref = new Map();
  const filteredHits = hits.filter((hit) => !isIgnoredDocsAnchorHit(hit));

  for (const hit of filteredHits) {
    if (normalizeSearchValue(hit?.[SEARCH_SOURCE_FIELD]) !== DOCS_SEARCH_SOURCE) continue;

    const href = getHitHref(hit);
    if (!href || href.includes('#')) continue;

    const docsPageHref = getDocsPageHref(hit);
    if (!docsPageHref || docsPageHitsByHref.has(docsPageHref)) continue;

    docsPageHitsByHref.set(docsPageHref, hit);
  }

  const dedupedDocsHits = filteredHits.filter((hit) => {
    if (normalizeSearchValue(hit?.[SEARCH_SOURCE_FIELD]) !== DOCS_SEARCH_SOURCE) return true;

    const href = getHitHref(hit);
    if (!href || !href.includes('#')) return true;

    const docsPageHref = getDocsPageHref(hit);
    const pageHit = docsPageHitsByHref.get(docsPageHref);

    if (!pageHit) return true;

    return !isDocsPageEquivalentAnchorHit(hit, pageHit);
  });

  const seenHitDestinations = new Set();

  return dedupedDocsHits.filter((hit) => {
    const href = getHitHref(hit);
    if (!href) return true;

    const searchSource = normalizeSearchValue(hit?.[SEARCH_SOURCE_FIELD]) || 'unknown';
    const dedupeKey = `${searchSource}:${href}`;

    if (seenHitDestinations.has(dedupeKey)) return false;

    seenHitDestinations.add(dedupeKey);
    return true;
  });
};

const normalizeMergedSearchHref = (href, source) => {
  const normalizedHref = normalizeSearchValue(href);
  if (!normalizedHref) return '';

  const docsHref = getRelativeDocsHref(normalizedHref);
  if (docsHref !== normalizedHref) return docsHref;
  if (normalizeSearchValue(source) !== WEBSITE_SEARCH_SOURCE) return normalizedHref;

  try {
    return new URL(normalizedHref, MARKETING_SITE_URL).toString();
  } catch {
    return normalizedHref;
  }
};

const shouldOpenSearchHitInNewTab = (hit) => {
  return normalizeSearchValue(hit?.[SEARCH_SOURCE_FIELD]) === WEBSITE_SEARCH_SOURCE;
};

const getUniqueSearchSegments = (segments = []) => {
  const uniqueSegments = [];
  const seen = new Set();

  for (const segment of segments) {
    const normalizedSegment = normalizeSearchValue(segment);
    if (!normalizedSegment) continue;

    const key = normalizedSegment.toLowerCase();
    if (seen.has(key)) continue;

    seen.add(key);
    uniqueSegments.push(normalizedSegment);
  }

  return uniqueSegments;
};

const getWebsiteBreadcrumbSegment = (hit) => {
  if (normalizeSearchValue(hit?.[SEARCH_SOURCE_FIELD]) !== WEBSITE_SEARCH_SOURCE) return '';

  const href = getHitHref(hit);
  if (!href) return '';

  try {
    const url = new URL(href, MARKETING_SITE_URL);
    const firstSegment = url.pathname.split('/').filter(Boolean).at(0);
    return getReadableAnchorTitle(firstSegment);
  } catch {
    return '';
  }
};

const getDocsSectionSlug = (hit) => {
  try {
    const url = new URL(getDocsPageHref(hit), DOCS_SITE_URL);
    return titleCase(decodeURIComponent(url.pathname.split('/').filter(Boolean).at(0) || ''));
  } catch {
    return '';
  }
};

const getDocsBreadcrumbScope = (hit) => {
  const sectionSlug = normalizeComparableSearchValue(getDocsSectionSlug(hit));

  if (sectionSlug === 'guides') return 'guides';
  if (sectionSlug === 'api') return 'api';
  return 'documentation';
};

const getScopedSearchCategory = (category, hit) => {
  const normalizedCategory = normalizeSearchValue(category);
  if (!normalizedCategory) return '';

  if (
    normalizeSearchValue(hit?.[SEARCH_SOURCE_FIELD]) === DOCS_SEARCH_SOURCE &&
    getDocsBreadcrumbScope(hit) !== 'documentation' &&
    normalizeComparableSearchValue(normalizedCategory) ===
      normalizeComparableSearchValue(DOCS_BREADCRUMB_LABEL)
  ) {
    return '';
  }

  return normalizedCategory;
};

const buildSearchResultDescriptionSegments = ({ category, groupLabel, hit }) => {
  if (normalizeSearchValue(hit?.[SEARCH_SOURCE_FIELD]) !== DOCS_SEARCH_SOURCE) {
    return getUniqueSearchSegments([
      groupLabel,
      getWebsiteBreadcrumbSegment(hit),
      getScopedSearchCategory(category, hit),
    ]);
  }

  const includePageTitle = isDocsAnchorHit(hit);
  const hitTitle = normalizeComparableSearchValue(getHitTitle(hit));
  const docsSectionTitle = getDocsSectionSlug(hit);
  const includeSectionTitle =
    includePageTitle || normalizeComparableSearchValue(docsSectionTitle) !== hitTitle;

  if (getDocsBreadcrumbScope(hit) === 'guides') {
    return getUniqueSearchSegments([
      groupLabel,
      includePageTitle ? getReadableDocsPageSlug(hit) : '',
      getScopedSearchCategory(category, hit),
    ]);
  }

  if (getDocsBreadcrumbScope(hit) !== 'documentation') {
    return getUniqueSearchSegments([groupLabel, getScopedSearchCategory(category, hit)]);
  }

  return getUniqueSearchSegments([
    DOCS_BREADCRUMB_LABEL,
    includeSectionTitle ? docsSectionTitle : '',
    includePageTitle ? getReadableDocsPageSlug(hit) : '',
  ]);
};

export {
  SEARCH_SOURCE_FIELD,
  buildSearchResultDescriptionSegments,
  dedupeMergedSearchHits,
  getDocsPageHref,
  getHitHref,
  getHitMethod,
  getHitTitle,
  getHitType,
  normalizeMergedSearchHref,
  normalizeSearchValue,
  shouldOpenSearchHitInNewTab,
};
