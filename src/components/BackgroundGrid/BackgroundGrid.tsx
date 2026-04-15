import type { ReactNode } from 'react';

import { cx } from 'class-variance-authority';

import { Grid } from '../Illustrations/Grid';
import styles from './BackgroundGrid.module.css';

interface BackgroundGridProps {
  className?: string;
  children?: ReactNode;
}

const BackgroundGrid = ({ className, children }: BackgroundGridProps) => {
  return (
    <div className={cx(styles.root, className)}>
      <div aria-hidden="true" className={styles.illustration}>
        <Grid />
        <div aria-hidden="true" className={styles.topVignette}></div>
        <div aria-hidden="true" className={styles.leftVignette}></div>
        <div aria-hidden="true" className={styles.bottomVignette}></div>
        <div aria-hidden="true" className={styles.rightVignette}></div>
      </div>
      <div className={styles.content}>{children}</div>
    </div>
  );
};

export { BackgroundGrid };
