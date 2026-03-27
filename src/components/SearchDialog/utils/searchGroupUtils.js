import { slugify, titleCase } from '../../../util/strings';
import { isExternalHref } from '../../../util/url';
import { filtersData } from './data';
import {
  getDocsPageHref,
  getHitHref,
  getHitType,
  normalizeSearchValue,
  SEARCH_SOURCE_FIELD,
} from './searchHitUtils';

// Default label for ungrouped or unrecognized document types
const DEFAULT_GROUP_LABEL = 'Other';
const RECOMMENDED_GROUP_TYPE = 'recommended';
const DOCS_GROUP_TYPES = new Set(['documentation', 'apiReference']);
const CLOUDSMITH_WEBSITE_GROUP_TYPE = 'cloudsmithWebsite';
const GUIDES_GROUP_TYPE = 'reportsAndGuidesPage';
const FILTER_ORDER_BY_TYPE = new Map(
  filtersData.map(({ documentType }, index) => [documentType || RECOMMENDED_GROUP_TYPE, index]),
);
const RECOMMENDED_FILTER_ORDER = -1;

// Map of document types that should be merged into other types
// e.g., platformFeaturesPage results are grouped with productPage, generic "page" types with "Resources"
const DOCUMENT_TYPE_OVERRIDES = new Map([
  ['api', 'apiReference'],
  ['apiReferencePage', 'apiReference'],
  ['docs', 'documentation'],
  ['documentationPage', 'documentation'],
  ['platformFeaturesPage', 'productPage'],
  ['page', 'campaignPage'],
  ['reference', 'apiReference'],
]);

// Map of document types to their display labels from filter data
const LABELS_BY_TYPE = new Map(filtersData.map(({ documentType, label }) => [documentType, label]));

const getSearchGroupType = (hit) => {
  const searchSource = normalizeSearchValue(hit?.[SEARCH_SOURCE_FIELD]);
  const href = getHitHref(hit).toLowerCase();

  if (searchSource === 'website') return CLOUDSMITH_WEBSITE_GROUP_TYPE;

  if (searchSource === 'docs') {
    if (href.startsWith('/api')) return 'apiReference';
    if (href.startsWith('/guides')) return GUIDES_GROUP_TYPE;
    return 'documentation';
  }

  return resolveGroupType(getHitType(hit));
};

// Resolves the final document type to use for grouping, applying any overrides
const resolveGroupType = (value) => DOCUMENT_TYPE_OVERRIDES.get(value) ?? normalizeSearchValue(value);

/**
 * Formats a document type value into a human-readable group label.
 * Checks for a predefined label first, otherwise converts to title case.
 * Returns DEFAULT_GROUP_LABEL if the value is empty or invalid.
 */
const formatGroupLabel = (value) => {
  const normalized = normalizeSearchValue(value);
  if (value === RECOMMENDED_GROUP_TYPE)
    return LABELS_BY_TYPE.get(RECOMMENDED_GROUP_TYPE) || DEFAULT_GROUP_LABEL;
  if (!normalized) return DEFAULT_GROUP_LABEL;

  const label = LABELS_BY_TYPE.get(value);
  if (label) return label.trim() || DEFAULT_GROUP_LABEL;

  return titleCase(normalized) || DEFAULT_GROUP_LABEL;
};

// Generates a unique, URL-safe ID for a search result group based on its label
const getGroupId = (value) => {
  const label = formatGroupLabel(value) || DEFAULT_GROUP_LABEL;
  return `search-group-${slugify(label)}`;
};

/**
 * Groups an array of search hits by their document type.
 * Each group contains an ID, label, type, array of hits, and count.
 * Applies type overrides and merges results as needed.
 * Returns groups sorted alphabetically by label.
 *
 * @param {Array} hits - Array of search hit objects with _type property
 * @returns {Array} Array of group objects with structure:
 *   - id: unique identifier for the group
 *   - label: display label for the group
 *   - _type: normalized document type
 *   - hits: array of search hits in this group
 *   - count: number of hits in the group
 */
const groupHitsByType = (hits = []) => {
  const grouped = new Map();

  for (const hit of hits) {
    const groupingType = getSearchGroupType(hit);
    const id = getGroupId(groupingType);
    const label = formatGroupLabel(groupingType);

    // Create group entry if it doesn't exist
    if (!grouped.has(id)) {
      grouped.set(id, {
        id,
        label,
        _type: groupingType,
        hits: [],
        count: 0,
      });
    }

    // Add hit to group and update count
    const entry = grouped.get(id);
    entry.hits.push(hit);
    entry.count += 1;
  }

  // Return groups sorted alphabetically by label before applying display order.
  return Array.from(grouped.values()).sort((a, b) => a.label.localeCompare(b.label));
};

const isDocsGroupType = (value) => DOCS_GROUP_TYPES.has(resolveGroupType(value));

const isDocsHit = (hit) => {
  if (hit?.[SEARCH_SOURCE_FIELD] === 'docs') return true;

  const slug = getHitHref(hit);
  if (!slug) return false;

  return !isExternalHref(slug) && isDocsGroupType(getHitType(hit));
};

const getRecommendedHits = (hits = [], limit = 5) => {
  if (limit <= 0 || hits.length === 0) return [];

  const recommendedHits = [];
  const seenDocsPages = new Set();

  for (const hit of hits) {
    if (!isDocsHit(hit)) continue;

    const docsPageHref = getDocsPageHref(hit);
    const dedupeKey = docsPageHref || getHitHref(hit);
    if (!dedupeKey || seenDocsPages.has(dedupeKey)) continue;

    seenDocsPages.add(dedupeKey);
    recommendedHits.push(hit);

    if (recommendedHits.length >= limit) break;
  }

  return recommendedHits;
};

const buildSearchGroups = (hits = []) => {
  const recommendedHits = getRecommendedHits(hits);
  const groups = sortSearchGroupsForFilters(groupHitsByType(hits));

  if (recommendedHits.length === 0) return groups;

  return [
    {
      id: getGroupId(RECOMMENDED_GROUP_TYPE),
      label: titleCase(RECOMMENDED_GROUP_TYPE),
      _type: RECOMMENDED_GROUP_TYPE,
      hits: recommendedHits,
      count: recommendedHits.length,
    },
    ...groups,
  ];
};

const sortSearchGroupsForFilters = (groups = []) => {
  return [...groups].sort((left, right) => {
    const leftOrder =
      left._type === RECOMMENDED_GROUP_TYPE
        ? RECOMMENDED_FILTER_ORDER
        : (FILTER_ORDER_BY_TYPE.get(left._type) ?? Number.MAX_SAFE_INTEGER);
    const rightOrder =
      right._type === RECOMMENDED_GROUP_TYPE
        ? RECOMMENDED_FILTER_ORDER
        : (FILTER_ORDER_BY_TYPE.get(right._type) ?? Number.MAX_SAFE_INTEGER);

    if (leftOrder !== rightOrder) return leftOrder - rightOrder;

    return left.label.localeCompare(right.label);
  });
};

export {
  CLOUDSMITH_WEBSITE_GROUP_TYPE,
  DEFAULT_GROUP_LABEL,
  GUIDES_GROUP_TYPE,
  RECOMMENDED_GROUP_TYPE,
  buildSearchGroups,
  formatGroupLabel,
  getGroupId,
  getRecommendedHits,
  getSearchGroupType,
  groupHitsByType,
  resolveGroupType,
  sortSearchGroupsForFilters,
};
