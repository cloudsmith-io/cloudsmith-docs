import * as RadixTabs from '@radix-ui/react-tabs';

const TabsContent = ({ children, value }: TabsContentProps) => {
  return <RadixTabs.Content value={value}>{children}</RadixTabs.Content>;
};

interface TabsContentProps {
  children: React.ReactNode;
  value: string;
}

export default TabsContent;
