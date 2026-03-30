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

const normalizeSearchValue = (value) => (typeof value === 'string' ? value.trim() : '');

const normalizeComparableSearchValue = (value) => {
  const normalizedValue = normalizeSearchValue(value);
  if (!normalizedValue) return '';

  return slugify(decodeURIComponent(normalizedValue).replace(/\+/g, ' '));
};

const getHitHref = (hit) => normalizeSearchValue(hit?.slug);

const getHitTitle = (hit) => {
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

  for (const hit of hits) {
    if (normalizeSearchValue(hit?.[SEARCH_SOURCE_FIELD]) !== DOCS_SEARCH_SOURCE) continue;

    const href = getHitHref(hit);
    if (!href || href.includes('#')) continue;

    const docsPageHref = getDocsPageHref(hit);
    if (!docsPageHref || docsPageHitsByHref.has(docsPageHref)) continue;

    docsPageHitsByHref.set(docsPageHref, hit);
  }

  return hits.filter((hit) => {
    if (normalizeSearchValue(hit?.[SEARCH_SOURCE_FIELD]) !== DOCS_SEARCH_SOURCE) return true;

    const href = getHitHref(hit);
    if (!href || !href.includes('#')) return true;

    const docsPageHref = getDocsPageHref(hit);
    const pageHit = docsPageHitsByHref.get(docsPageHref);

    if (!pageHit) return true;

    return !isDocsPageEquivalentAnchorHit(hit, pageHit);
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

const getDocsSectionSlug = (hit) => {
  try {
    const url = new URL(getDocsPageHref(hit), DOCS_SITE_URL);
    return titleCase(decodeURIComponent(url.pathname.split('/').filter(Boolean).at(0) || ''));
  } catch {
    return '';
  }
};

const buildSearchResultDescriptionSegments = ({ category, groupLabel, hit }) => {
  if (normalizeSearchValue(hit?.[SEARCH_SOURCE_FIELD]) !== DOCS_SEARCH_SOURCE) {
    return getUniqueSearchSegments([groupLabel, category]);
  }

  return getUniqueSearchSegments([DOCS_BREADCRUMB_LABEL, getDocsSectionSlug(hit)]);
};

export {
  SEARCH_SOURCE_FIELD,
  buildSearchResultDescriptionSegments,
  dedupeMergedSearchHits,
  getDocsPageHref,
  getHitHref,
  getHitTitle,
  getHitType,
  normalizeMergedSearchHref,
  normalizeSearchValue,
  shouldOpenSearchHitInNewTab,
};
