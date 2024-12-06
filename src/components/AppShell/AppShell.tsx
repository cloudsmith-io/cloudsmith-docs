import React from 'react';

import { Container } from '../Container';

import styles from './AppShell.module.css';

interface AppShellProps {
  children: React.ReactNode;
  secondaryNav?: React.ReactNode;
}

export function AppShell({ children, secondaryNav }: AppShellProps) {
  return (
    <Container className={styles.root}>
      {secondaryNav && <div className={styles.secondaryNav}>{secondaryNav}</div>}
      <div className={styles.main}>{children}</div>
    </Container>
  );
}
