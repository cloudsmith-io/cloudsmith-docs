import { cx } from 'class-variance-authority';
import Slot from '@/components/Slot';

import styles from './Container.module.css';

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: 'div' | 'section' | 'article' | 'aside' | 'nav' | 'header' | 'footer' | 'main';
  children: React.ReactNode;
  className?: string;
  asChild?: boolean;
}

export function Container({ as = 'div', children, className, asChild, ...rest }: ContainerProps) {
  const Comp = asChild ? Slot : as;
  return (
    <Comp className={cx(styles.root, className)} {...rest}>
      {children}
    </Comp>
  );
}
