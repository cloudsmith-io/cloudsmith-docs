import { Suspense } from 'react';

import type { Metadata } from 'next';

import { Analytics } from '@vercel/analytics/next';
import { cx } from 'class-variance-authority';
import Script from 'next/script';

import { Navbar } from '@/components';

import { mdSystem, replica, replicaMono } from './_assets/fonts';
import { NavigationEvents, NavigationProvider } from './navigation';

import './_styles/critical.css';

export const metadata: Metadata = {
  title: {
    template: '%s | Cloudsmith Docs',
    default: 'Cloudsmith Documentation',
  },
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={cx(mdSystem.variable, replica.variable, replicaMono.variable)}>
      <body>
        <NavigationProvider>
          <Navbar />
          {children}
          <noscript>
            <img
              src="https://simple.cloudsmith.com/noscript.gif?collect-dnt=true&hostname=docs.cloudsmith.com"
              alt=""
              referrerPolicy="no-referrer-when-downgrade"
            />
          </noscript>
          <Suspense fallback={null}>
            <NavigationEvents />
          </Suspense>
        </NavigationProvider>
        <Analytics />
      </body>
      <Script
        strategy="afterInteractive"
        async
        defer
        src="https://simple.cloudsmith.com/latest.js"
        data-collect-dnt="true"
        data-hostname="docs.cloudsmith.com"
      />
    </html>
  );
}
