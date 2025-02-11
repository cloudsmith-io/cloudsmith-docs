import * as RadixTabs from '@radix-ui/react-tabs';

import styles from './TabsList.module.css';

const TabsList = ({ children }: TabsListProps) => {
  return <RadixTabs.List className={styles.root}>{children}</RadixTabs.List>;
};

interface TabsListProps {
  children: React.ReactNode;
}

export default TabsList;
