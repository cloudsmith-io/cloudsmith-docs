import { Icon } from '@/icons';
import { cx } from 'class-variance-authority';
import { Filters } from './SearchDialog';

import styles from './FilterButtons.module.css';

export interface FilterButtonsProps {
  filters: Filters;
  activeSections: Array<string>;
  onFilterChange: (filterId: string) => void;
}

export const FilterButtons = ({ filters, activeSections, onFilterChange }: FilterButtonsProps) => {
  return (
    <div className={styles.filters}>
      <div className={styles.filtersList}>
        {filters.map((filter) => (
          <button
            key={filter.id}
            onClick={() => onFilterChange(filter.id)}
            className={cx(styles.filter, {
              [styles.filterActive]: activeSections.includes(filter.id),
              [styles.filterDisabled]: activeSections.includes(filter.id) && activeSections.length === 1,
            })}>
            <Icon name={filter.icon} className={styles.filterIcon} title="" />
            {filter.label}
          </button>
        ))}
      </div>
    </div>
  );
};
