import { Navbar } from '@/components';
import { cx } from 'class-variance-authority';
import { LazyMotion, domAnimation } from 'motion/react';
import { Suspense } from 'react';
import { mdSystem, replica, replicaMono } from './_assets/fonts';
import { NavigationEvents, NavigationProvider } from './navigation';

import './_styles/critical.css';
import styles from './layout.module.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={cx(mdSystem.variable, replica.variable, replicaMono.variable)}>
      <body>
        <NavigationProvider>
          <Navbar />

          <div className={styles.container}>
            <LazyMotion features={domAnimation}>{children}</LazyMotion>
          </div>

          <Suspense fallback={null}>
            <NavigationEvents />
          </Suspense>
        </NavigationProvider>
      </body>
    </html>
  );
}
