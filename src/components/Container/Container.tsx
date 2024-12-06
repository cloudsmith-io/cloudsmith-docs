import { cx } from 'class-variance-authority';

import styles from './Container.module.css';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

export function Container({ children, className }: ContainerProps) {
  return <div className={cx(styles.root, className)}>{children}</div>;
}
