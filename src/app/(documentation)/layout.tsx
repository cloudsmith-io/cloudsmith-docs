import { AppShell } from '@/components/AppShell';

export default function Layout({ children }: { children: React.ReactNode }) {
  // get menu data and render in a navigation element

  return <AppShell>{children}</AppShell>;
}
