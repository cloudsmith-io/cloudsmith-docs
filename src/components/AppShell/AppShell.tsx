import React from 'react';

import { Container } from '../Container';

import styles from './AppShell.module.css';

export function AppShell({ children, secondaryNav }: AppShell.Props) {
  return (
    <Container className={styles.root}>
      {secondaryNav && <div className={styles.secondaryNav}>{secondaryNav}</div>}
      <div className={styles.main}>{children}</div>
    </Container>
  );
}

export namespace AppShell {
  export interface Props extends React.ComponentPropsWithoutRef<'div'> {
    children: React.ReactNode;
    secondaryNav?: React.ReactNode;
  }
}
