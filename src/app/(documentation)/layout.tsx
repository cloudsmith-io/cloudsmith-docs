import { AppShell } from '@/components/AppShell';

import { Sidebar } from './Sidebar';

export default function Layout({ children }: { children: React.ReactNode }) {
  return <AppShell secondaryNav={<Sidebar />}>{children}</AppShell>;
}
