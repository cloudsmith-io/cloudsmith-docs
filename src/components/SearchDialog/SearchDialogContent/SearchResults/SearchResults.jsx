import { Fragment, useEffect, useMemo, useRef, useState } from 'react';

import { cx } from 'class-variance-authority';
import { useRouter } from 'next/navigation';

import { Tag } from '@/components';
import { Link } from '@/components/Link';
import { Icon } from '@/icons';
import { isExternalHref } from '@/util/url';

import { filtersData } from '../../utils/data';
import {
  buildSearchGroups,
  formatGroupLabel,
  getSearchGroupType,
  RECOMMENDED_GROUP_TYPE,
} from '../../utils/searchGroupUtils';
import {
  buildSearchResultDescriptionSegments,
  getHitHref,
  getHitMethod,
  getHitTitle,
  normalizeSearchValue,
  shouldOpenSearchHitInNewTab,
} from '../../utils/searchHitUtils';
import styles from './SearchResults.module.css';

const getHitCategory = (hit) => {
  return (
    normalizeSearchValue(hit?.category) ||
    normalizeSearchValue(hit?.section) ||
    normalizeSearchValue(hit?.hierarchy?.lvl0)
  );
};

const getHitObjectId = (hit, fallbackIndex) => {
  return (
    normalizeSearchValue(hit?.objectID) ||
    `${normalizeSearchValue(hit?._type || hit?.type || 'result')}-${getHitHref(hit) || getHitTitle(hit) || fallbackIndex}`
  );
};

const navigateToHit = (slug, router, opensInNewTab) => {
  if (!slug) return;

  if (opensInNewTab) {
    window.open(slug, '_blank', 'noopener,noreferrer');
    return;
  }

  if (isExternalHref(slug)) {
    window.location.assign(slug);
    return;
  }

  router.push(slug);
};

const Hit = ({ hit, group, groupType, onClose }) => {
  const href = getHitHref(hit);
  const method = getHitMethod(hit);
  const title = getHitTitle(hit);
  const opensInNewTab = shouldOpenSearchHitInNewTab(hit);
  const hitType = getSearchGroupType(hit);
  const hitFilter = filtersData.find((filter) => filter.documentType === hitType);
  const resultIcon = groupType === RECOMMENDED_GROUP_TYPE ? hitFilter?.icon : group?.icon;
  const resultGroupLabel = formatGroupLabel(groupType === RECOMMENDED_GROUP_TYPE ? hitType : groupType);
  const resultCategory = getHitCategory(hit);
  const shouldShowCategory =
    resultCategory.length > 0 && resultCategory.toLowerCase() !== resultGroupLabel.toLowerCase();
  const descriptionSegments = buildSearchResultDescriptionSegments({
    category: shouldShowCategory ? resultCategory : '',
    groupLabel: resultGroupLabel,
    hit,
  });

  const hitContent = (
    <>
      {resultIcon && (
        <div className={styles.searchIconWrapper}>
          <Icon name={resultIcon} className={styles.searchIcon} title="" />
        </div>
      )}
      <div className={styles.resultContent}>
        <span className={styles.resultTitleRow}>
          <span className={styles.resultTitle}>{title}</span>
          {method && <Tag method={method} size="small" className={styles.resultMethodTag} />}
        </span>
        <span className={styles.resultDescription}>
          {descriptionSegments.map((segment, index) => (
            <Fragment key={`${segment}-${index}`}>
              {index > 0 && <Icon name="chevronRight" className={styles.resultCategorySeparator} title="" />}
              {segment}
            </Fragment>
          ))}
        </span>
      </div>
      <Icon
        name={opensInNewTab ? 'external' : 'arrowRight'}
        className={styles.resultIcon}
        aria-hidden="true"
        focusable="false"
        title=""
      />
    </>
  );

  if (opensInNewTab) {
    return (
      <a href={href} className={styles.resultLink} tabIndex={-1} target="_blank" rel="noopener noreferrer">
        {hitContent}
      </a>
    );
  }

  return (
    <Link href={href} className={styles.resultLink} tabIndex={-1} onClick={onClose} prefetch={false}>
      {hitContent}
    </Link>
  );
};

const renderResultsSection = ({ group, activeIndex, itemRefs, currentFilter, onClose }) => {
  const items = group.items.map((item) => (
    <li
      key={getHitObjectId(item.hit, item.index)}
      ref={(node) => {
        itemRefs.current[item.index] = node;
      }}
      tabIndex={-1}
      aria-current={item.index === activeIndex ? 'true' : undefined}
      className={cx(styles.hitItem, item.index === activeIndex ? styles.resultLinkFocus : null)}>
      <Hit hit={item.hit} group={currentFilter} groupType={group._type} onClose={onClose} />
    </li>
  ));

  return (
    <section key={group.id} className={styles.groupSection} aria-label={`${group.label} results`}>
      <h3 id={group.id} className={styles.groupTitle}>
        {group.label}
      </h3>
      <ul className={styles.resultsList}>{items}</ul>
    </section>
  );
};

const SearchResults = ({ hits, isSearching, onClose, query, searchError, settledQuery }) => {
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState(-1);
  const itemRefs = useRef([]);
  const scrollContainerRef = useRef(null);

  const groupedHits = useMemo(() => {
    return buildSearchGroups(hits || []);
  }, [hits]);

  const groupedHitsWithIndex = useMemo(() => {
    let index = 0;

    return groupedHits.map((group) => ({
      ...group,
      items: group.hits.map((hit) => ({ hit, index: index++ })),
    }));
  }, [groupedHits]);

  const flattenedHits = useMemo(
    () => groupedHitsWithIndex.flatMap((group) => group.items.map((item) => item.hit)),
    [groupedHitsWithIndex],
  );

  // Reset the active item
  useEffect(() => {
    if (!query || flattenedHits.length === 0) {
      setActiveIndex(-1);
      return;
    }
    setActiveIndex(0);
  }, [query, flattenedHits.length]);

  // Keep ref list aligned with the current number of hits
  useEffect(() => {
    itemRefs.current = itemRefs.current.slice(0, flattenedHits.length);
  }, [flattenedHits.length]);

  // Keep the active item in view without stealing focus from the search input
  useEffect(() => {
    if (activeIndex < 0) return;

    const target = itemRefs.current[activeIndex];
    const container = scrollContainerRef.current;
    if (!target || !container) return;

    // Manually scroll only the results container to avoid scrolling ancestor containers (like the dialog itself).
    // scrollIntoView would scroll all ancestors, causing the dialog to shift.
    const targetRect = target.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();
    const targetTop = targetRect.top - containerRect.top + container.scrollTop;

    const desiredTop = targetTop - container.clientHeight / 2 + target.offsetHeight / 2;
    const maxTop = Math.max(0, container.scrollHeight - container.clientHeight);
    const clampedTop = Math.max(0, Math.min(maxTop, desiredTop));

    container.scrollTo({ top: clampedTop, behavior: 'auto' });
  }, [activeIndex]);

  // Handle global keyboard navigation and selection
  useEffect(() => {
    if (!query || flattenedHits.length === 0) return;

    const updateActiveIndex = (delta) => {
      setActiveIndex((current) => {
        if (flattenedHits.length === 0) return -1;

        const nextIndex = current < 0 ? 0 : current + delta;
        return Math.max(0, Math.min(flattenedHits.length - 1, nextIndex));
      });
    };

    const handleKeyDown = (event) => {
      if (event.defaultPrevented) return;

      if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
        event.preventDefault();
        updateActiveIndex(event.key === 'ArrowDown' ? 1 : -1);

        return;
      }

      if (event.key === 'Tab') {
        event.preventDefault();
        updateActiveIndex(event.shiftKey ? -1 : 1);
        return;
      }

      if (event.key === 'Enter' && activeIndex >= 0) {
        event.preventDefault();
        const activeItem = itemRefs.current[activeIndex];
        const activeLink = activeItem?.querySelector('a[href]');

        if (activeLink) {
          activeLink.click();
          return;
        }

        const hit = flattenedHits[activeIndex];
        const href = getHitHref(hit);
        if (href) {
          const opensInNewTab = shouldOpenSearchHitInNewTab(hit);
          if (!opensInNewTab) onClose();
          navigateToHit(href, router, opensInNewTab);
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown, { capture: true });

    return () => {
      document.removeEventListener('keydown', handleKeyDown, { capture: true });
    };
  }, [activeIndex, flattenedHits, query, router, onClose]);

  const showPrompt = query === '';
  const showNoResults = query !== '' && query === settledQuery && hits.length === 0;

  if (query && isSearching && hits.length === 0) return null;

  // Show error message if Algolia is unavailable
  if (showNoResults && searchError && query) {
    return (
      <div className={styles.noResultsContainer}>
        <p className={styles.noResults}>{searchError}</p>
      </div>
    );
  }

  return showPrompt || showNoResults ? (
    <div className={styles.noResultsContainer}>
      <p className={styles.noResults}>{showPrompt ? 'Please enter a search term' : 'No results found'}</p>
    </div>
  ) : (
    <div className={styles.root} ref={scrollContainerRef}>
      <div className={styles.resultsContainer}>
        {groupedHitsWithIndex.map((group) => {
          const currentFilter = filtersData.find(
            (filter) => filter.documentType === (group._type === RECOMMENDED_GROUP_TYPE ? '' : group._type),
          );

          return renderResultsSection({
            group,
            activeIndex,
            itemRefs,
            currentFilter,
            onClose,
          });
        })}
      </div>
    </div>
  );
};

export { SearchResults };
