import * as RadixTabs from '@radix-ui/react-tabs';

import styles from './TabsTrigger.module.css';

const TabsTrigger = ({ children, value, disabled }: TabsTriggerProps) => {
  return (
    <RadixTabs.Trigger disabled={disabled} value={value} className={styles.root}>
      {children}
    </RadixTabs.Trigger>
  );
};

interface TabsTriggerProps {
  children: React.ReactNode;
  value: string;
  disabled?: boolean;
}

export default TabsTrigger;
