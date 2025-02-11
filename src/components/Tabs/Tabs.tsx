import * as RadixTabs from '@radix-ui/react-tabs';

import styles from './Tabs.module.css';

const Tabs = ({ children, defaultValue }: TabsProps) => {
  return (
    <RadixTabs.Root defaultValue={defaultValue} className={styles.root}>
      {children}
    </RadixTabs.Root>
  );
};

interface TabsProps {
  children: React.ReactNode;
  defaultValue?: string;
}

export default Tabs;
