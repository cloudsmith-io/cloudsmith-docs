import { cva, cx, VariantProps } from 'class-variance-authority';

import styles from './ApiGrid.module.css';

/* Grid */
export const ApiGrid = ({ heading, children }: { heading: string; children: React.ReactNode }) => (
  <div className={styles.grid}>
    <div className={cx(styles.item, styles.header)}>
      <div className={styles.subItem}>{heading}</div>
    </div>

    {children}
  </div>
);

/* Row */
export const ApiGridRow = ({ children }: { children: React.ReactNode }) => (
  <div className={styles.item}>{children}</div>
);

/* Column */
const columnVariants = cva(styles.subItem, {
  variants: {
    type: {
      type: styles.subItemType,
      description: styles.subItemDescription,
      descriptionWide: styles.subItemDescriptionWide,
    },
  },
});

export const ApiGridColumn = ({ children, type }: GridColumnProps) => (
  <div className={columnVariants({ type })}>{children}</div>
);

interface GridColumnProps extends VariantProps<typeof columnVariants> {
  children: React.ReactNode;
}
