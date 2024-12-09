import { Suspense } from 'react';

import { AppShell } from '@/components/AppShell';

import { Sidebar } from './Sidebar';

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <AppShell
      secondaryNav={
        <Suspense>
          <Sidebar />
        </Suspense>
      }>
      {children}
    </AppShell>
  );
}
