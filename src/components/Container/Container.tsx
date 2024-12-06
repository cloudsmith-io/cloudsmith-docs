import cn from 'classnames';

import styles from './Container.module.css';

export function Container({ children, className }: Container.Props) {
  return <div className={cn(styles.root, className)}>{children}</div>;
}

export namespace Container {
  export interface Props extends React.ComponentPropsWithoutRef<'div'> {
    children: React.ReactNode;
    className?: string;
  }
}
