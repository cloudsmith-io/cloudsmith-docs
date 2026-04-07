import React from 'react';

import { Container } from '../Container';
import styles from './AppShell.module.css';

export const AppShell = ({ children, secondaryNav }: AppShellProps) => {
  return (
    <Container className={styles.root}>
      {secondaryNav && (
        <aside className={styles.secondaryNav}>
          <div className={styles.secondaryNavInner}>{secondaryNav}</div>
        </aside>
      )}
      <div className={styles.main}>{children}</div>
      <div className={styles.footerSpacer} aria-hidden="true" />
    </Container>
  );
};
interface AppShellProps {
  children: React.ReactNode;
  secondaryNav?: React.ReactNode;
}
