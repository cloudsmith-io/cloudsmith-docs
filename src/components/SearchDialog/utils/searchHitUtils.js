import { titleCase } from '@/util/strings';
import { isExternalHref } from '@/util/url';

const DOCS_SITE_ORIGIN = process.env.NEXT_PUBLIC_DOCS_SITE_ORIGIN;
const MARKETING_SITE_ORIGIN = process.env.NEXT_PUBLIC_MARKETING_SITE_ORIGIN;
const DOCS_SITE_URL = new URL(DOCS_SITE_ORIGIN);
const MARKETING_SITE_URL = new URL(MARKETING_SITE_ORIGIN);
const SEARCH_SOURCE_FIELD = 'searchSource';
const DOCS_SEARCH_SOURCE = 'docs';
const WEBSITE_SEARCH_SOURCE = 'website';
const UPPERCASE_SEARCH_LABEL_WORDS = new Set([
  'api',
  'aws',
  'ci',
  'cli',
  'cd',
  'gpg',
  'sbom',
  'sso',
  'ui',
  'url',
]);

const normalizeSearchValue = (value) => (typeof value === 'string' ? value.trim() : '');

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

const buildSearchResultDescriptionSegments = ({ category, groupLabel, hit }) => {
  const baseSegments = getUniqueSearchSegments([groupLabel, category]);

  if (normalizeSearchValue(hit?.[SEARCH_SOURCE_FIELD]) !== DOCS_SEARCH_SOURCE) {
    return baseSegments;
  }

  const excludedSegments = new Set(baseSegments.map((segment) => segment.toLowerCase()));
  const docsPageTitle = ['lvl0', 'lvl1', 'lvl2', 'lvl3', 'lvl4', 'lvl5', 'lvl6']
    .map((level) => normalizeSearchValue(hit?.hierarchy?.[level]))
    .find((segment) => segment && !excludedSegments.has(segment.toLowerCase()));

  const anchorTitle = getHitHref(hit).includes('#') ? getHitTitle(hit) : '';

  const descriptionSegments = getUniqueSearchSegments([...baseSegments, docsPageTitle, anchorTitle]);
  if (descriptionSegments.length > baseSegments.length) {
    return descriptionSegments;
  }

  const fallbackDescription = getDocsPathFallbackDescription(hit);
  if (fallbackDescription) {
    return getUniqueSearchSegments([...baseSegments, fallbackDescription]);
  }

  return descriptionSegments;
};

const formatSearchLabelWord = (word) => {
  if (!word) return '';

  const normalizedWord = normalizeSearchValue(word);
  if (!normalizedWord) return '';

  if (UPPERCASE_SEARCH_LABEL_WORDS.has(normalizedWord.toLowerCase())) {
    return normalizedWord.toUpperCase();
  }

  return normalizedWord;
};

const formatSearchLabelSegment = (value) => {
  const normalizedValue = normalizeSearchValue(value);
  if (!normalizedValue) return '';

  const decodedValue = decodeURIComponent(normalizedValue).replace(/\+/g, ' ');

  return titleCase(decodedValue)
    .split(' ')
    .map((word) => formatSearchLabelWord(word))
    .join(' ')
    .trim();
};

const getDocsPathFallbackDescription = (hit) => {
  const href = getHitHref(hit);
  if (!href) return '';

  try {
    const url = new URL(href, DOCS_SITE_URL);
    const title = getHitTitle(hit).toLowerCase();
    const pathSegments = url.pathname.split('/').filter(Boolean);
    const parentPath = pathSegments.slice(0, -1).map(formatSearchLabelSegment).filter(Boolean).join(' / ');
    const anchorSegment = formatSearchLabelSegment(url.hash.replace(/^#/, ''));
    const hasDistinctAnchor = anchorSegment && anchorSegment.toLowerCase() !== title;

    if (parentPath && hasDistinctAnchor) return parentPath;
    if (parentPath) return parentPath;

    if (url.pathname.startsWith('/api')) return 'API reference page';
    if (url.pathname.startsWith('/guides')) return 'Guide page';

    return 'Documentation page';
  } catch {
    return '';
  }
};

export {
  SEARCH_SOURCE_FIELD,
  buildSearchResultDescriptionSegments,
  getDocsPageHref,
  getHitHref,
  getHitTitle,
  getHitType,
  normalizeMergedSearchHref,
  normalizeSearchValue,
  shouldOpenSearchHitInNewTab,
};
