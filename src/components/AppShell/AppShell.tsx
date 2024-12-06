import React from 'react';

import styles from './AppShell.module.css';

export function AppShell({ children, secondaryNavigation }: AppShell.Props) {
  return (
    <div>
      {secondaryNavigation && <div className={styles.secondaryNavigation}>{secondaryNavigation}</div>}
      <div className={styles.main}>{children}</div>
    </div>
  );
}

export namespace AppShell {
  export interface Props extends React.ComponentPropsWithoutRef<'div'> {
    children: React.ReactNode;
    secondaryNavigation: React.ReactNode;
  }
}
