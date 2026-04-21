import { useMemo } from 'react';

import type { SearchFilterDefinition, SearchGroup, SearchHit } from '../../types';

import { Icon } from '@/icons';

import { filtersData } from '../../utils/data';
import { buildSearchGroups, RECOMMENDED_GROUP_TYPE } from '../../utils/searchGroupUtils';
import styles from './SearchFilters.module.css';

interface SearchFiltersProps {
  hits: SearchHit[];
  query: string;
}

const searchFilters = filtersData as SearchFilterDefinition[];

export const SearchFilters = ({ hits, query }: SearchFiltersProps) => {
  const groupedHits = useMemo(() => {
    return buildSearchGroups(hits || []) as SearchGroup[];
  }, [hits]);

  if (!query || groupedHits.length === 0) return null;

  const scrollToGroup = (groupId: string) => {
    const target = document.getElementById(groupId);
    if (!target) return;

    // Find the scrollable container (SearchResults root)
    const scrollContainer = target.closest('[class*="root"]');
    if (!(scrollContainer instanceof HTMLElement)) return;

    // Calculate position relative to the scroll container
    const containerRect = scrollContainer.getBoundingClientRect();
    const targetRect = target.getBoundingClientRect();
    const targetRelativeTop = targetRect.top - containerRect.top;

    scrollContainer.scrollTo({
      top: scrollContainer.scrollTop + targetRelativeTop - 16,
      behavior: 'smooth',
    });
  };

  return (
    <nav className={styles.groups} aria-label="Search result groups">
      <ul className={styles.groupList}>
        {groupedHits.map((group) => {
          const currentFilter = searchFilters.find(
            (filter) => filter.documentType === (group._type === RECOMMENDED_GROUP_TYPE ? '' : group._type),
          );

          return (
            <li key={group.id}>
              <button
                type="button"
                className={styles.groupItem}
                onClick={() => scrollToGroup(group.id)}
                aria-controls={group.id}
                tabIndex={-1}>
                <div className={styles.groupItemLabel}>
                  {currentFilter?.icon && (
                    <Icon name={currentFilter.icon} className={styles.groupItemIcon} title="" />
                  )}
                  <span>{currentFilter?.label || group.label}</span>
                </div>
                <span className={styles.groupItemCount}>{group.count}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
