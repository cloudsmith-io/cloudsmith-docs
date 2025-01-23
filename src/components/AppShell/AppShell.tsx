'use client';

import { useNavigation } from '@/app/navigation';
import { cx } from 'class-variance-authority';
import React from 'react';
import { Container } from '../Container';

import styles from './AppShell.module.css';

export const AppShell = ({ children, secondaryNav }: AppShellProps) => {
  const { isOpen } = useNavigation();

  return (
    <Container className={styles.root}>
      {secondaryNav && (
        <aside className={cx(styles.secondaryNav, { [styles.open]: isOpen })}>{secondaryNav}</aside>
      )}

      <div className={styles.main}>{children}</div>
    </Container>
  );
};
interface AppShellProps {
  children: React.ReactNode;
  secondaryNav?: React.ReactNode;
}
