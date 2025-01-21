import { cx } from 'class-variance-authority';
import { LazyMotion, domAnimation } from 'motion/react';
import type { Metadata } from 'next';

import { Navbar } from '@/components';

import { mdSystem, replica, replicaMono } from './_assets/fonts';

import './_styles/critical.css';
import styles from './layout.module.css';

export const metadata: Metadata = {
  title: {
    template: '%s | Cloudsmith Docs',
    default: 'Cloudsmith Documentation',
  },
};

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
