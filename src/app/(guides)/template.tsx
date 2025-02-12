import WithQuicknav from '@/components/WithQuickNav';

const Template = ({ children }: { children: React.ReactNode }) => {
  return <WithQuicknav>{children}</WithQuicknav>;
};

export default Template;
