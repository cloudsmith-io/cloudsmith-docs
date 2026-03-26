import { isExternalHref } from '@/util/url';

const DOCS_SITE_ORIGIN = process.env.NEXT_PUBLIC_DOCS_SITE_ORIGIN;
const MARKETING_SITE_ORIGIN = process.env.NEXT_PUBLIC_MARKETING_SITE_ORIGIN;
const DOCS_SITE_URL = new URL(DOCS_SITE_ORIGIN);
const MARKETING_SITE_URL = new URL(MARKETING_SITE_ORIGIN);
const WEBSITE_SEARCH_SOURCE = 'website';

const normalizeSearchValue = (value) => (typeof value === 'string' ? value.trim() : '');

const getHitHref = (hit) => normalizeSearchValue(hit?.slug);

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
  return normalizeSearchValue(hit?.__searchSource) === WEBSITE_SEARCH_SOURCE;
};

export {
  getHitHref,
  getHitType,
  normalizeMergedSearchHref,
  normalizeSearchValue,
  shouldOpenSearchHitInNewTab,
};
