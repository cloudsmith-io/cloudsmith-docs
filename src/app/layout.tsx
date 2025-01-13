import { cx } from 'class-variance-authority';
import { LazyMotion, domAnimation } from 'motion/react';

import { Navbar } from '@/components';

import { mdSystem, replica, replicaMono } from './_assets/fonts';

import './_styles/critical.css';
import styles from './layout.module.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={cx(mdSystem.variable, replica.variable, replicaMono.variable)}>
      <body>
        <Navbar />
        <div className={styles.container}>
          <LazyMotion features={domAnimation}>{children}</LazyMotion>
        </div>
      </body>
    </html>
  );
}
