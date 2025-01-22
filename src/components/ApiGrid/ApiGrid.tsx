import { cva, cx, VariantProps } from 'class-variance-authority';
import { Transition } from 'motion/dist/react';
import * as m from 'motion/react-m';

import styles from './ApiGrid.module.css';

/* Grid */
export const ApiGrid = ({ heading, children }: Grid) => (
  <div className={styles.grid}>
    <div className={cx(styles.item, styles.header)}>
      <div className={styles.subItem}>{heading}</div>
    </div>

    {children}
  </div>
);

/* Rows */
export const ApiGridRow = ({ children, ...rest }: GridRowStandard) => (
  <div className={styles.item} {...rest}>
    {children}
  </div>
);

export const ApiGridRowToggler = ({ onToggle, children }: GridRowToggler) => (
  <button type="button" className={cx(styles.item, styles.itemToggler)} onClick={onToggle}>
    {children}
  </button>
);

const transition: Transition = { duration: 0.35, ease: [0.55, 0, 0, 1] };

export const ApiGridRowContent = ({ children, isOpen }: GridRowContent) => (
  <m.div
    className={cx(styles.item, styles.itemContent)}
    initial={isOpen ? 'expanded' : 'collapsed'}
    animate={isOpen ? 'expanded' : 'collapsed'}
    transition={transition}
    variants={{
      expanded: { opacity: 1, height: 'auto' },
      collapsed: { opacity: 0, height: 0 },
    }}>
    <div className={styles.itemContentInner}>{children}</div>
  </m.div>
);

/* Column */
const columnVariants = cva(styles.subItem, {
  variants: {
    type: {
      type: styles.subItemType,
      description: styles.subItemDescription,
      descriptionWide: styles.subItemDescriptionWide,
      media: styles.subItemMedia,
    },
  },
});

export const ApiGridColumn = ({ children, type }: GridColumn) => (
  <div className={columnVariants({ type })}>{children}</div>
);

interface Grid {
  heading: string | React.ReactNode;
  children: React.ReactNode;
}

interface GridRowStandard {
  children: React.ReactNode;
}

interface GridRowToggler {
  onToggle: () => void;
  children: React.ReactNode;
}

interface GridRowContent {
  isOpen: boolean | undefined;
  children: React.ReactNode;
}

interface GridColumn extends VariantProps<typeof columnVariants> {
  children: React.ReactNode;
}
