import { Navbar } from '@/components';
import { cx } from 'class-variance-authority';
import type { Metadata } from 'next';
import Script from 'next/script';
import { Suspense } from 'react';
import { mdSystem, replica, replicaMono } from './_assets/fonts';
import { NavigationEvents, NavigationProvider } from './navigation';
import { GoogleTagManager } from '@next/third-parties/google'

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
      <GoogleTagManager gtmId="GTM-564RFVD" />
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
