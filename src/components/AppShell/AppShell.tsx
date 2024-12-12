import React from 'react';

import { Container } from '../Container';

import styles from './AppShell.module.css';

export const AppShell = ({ children, secondaryNav }: AppShellProps) => {
  return (
    <Container className={styles.root}>
      {secondaryNav && <aside className={styles.secondaryNav}>{secondaryNav}</aside>}
      <div className={styles.main}>{children}</div>
    </Container>
  );
};
interface AppShellProps {
  children: React.ReactNode;
  secondaryNav?: React.ReactNode;
}
