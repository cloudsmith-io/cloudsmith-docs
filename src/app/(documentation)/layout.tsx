import { AppShell } from '@/components/AppShell';
import { getMenuData } from '@/lib/menu/util';

import { Sidebar } from './Sidebar';

export default function Layout({ children }: { children: React.ReactNode }) {
  return <AppShell secondaryNav={<Sidebar />}>{children}</AppShell>;
}
