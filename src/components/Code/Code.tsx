import styles from './Code.module.css';

export const Code = ({ children }: React.ComponentPropsWithoutRef<'code'>) => {
  return <code className={styles.root}>{children}</code>;
};
