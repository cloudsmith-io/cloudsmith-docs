import WithQuicknav from '@/components/WithQuickNav';

export default function Layout({ children }: { children: React.ReactNode }) {
  return <WithQuicknav>{children}</WithQuicknav>;
}
