import * as motion from 'motion/react-client';
import React from 'react';
import { Container } from '../Container';

import styles from './AppShell.module.css';

export const AppShell = ({ children, secondaryNav }: AppShellProps) => {
  return (
    <Container className={styles.root}>
      {secondaryNav && <motion.aside className={styles.secondaryNav}>{secondaryNav}</motion.aside>}
      <div className={styles.main}>{children}</div>
    </Container>
  );
};
interface AppShellProps {
  children: React.ReactNode;
  secondaryNav?: React.ReactNode;
}
