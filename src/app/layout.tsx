import { Navbar } from '@/components';
import { cx } from 'class-variance-authority';
import { LazyMotion, domAnimation } from 'motion/react';
import type { Metadata } from 'next';
import { Suspense } from 'react';
import { mdSystem, replica, replicaMono } from './_assets/fonts';
import { NavigationEvents, NavigationProvider } from './navigation';

import './_styles/critical.css';

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
        <NavigationProvider>
          <Navbar />
          <LazyMotion features={domAnimation}>{children}</LazyMotion>
          <Suspense fallback={null}>
            <NavigationEvents />
          </Suspense>
        </NavigationProvider>
      </body>
    </html>
  );
}
