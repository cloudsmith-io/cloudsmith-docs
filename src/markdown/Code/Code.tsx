import styles from './Code.module.css';

export const Code = ({ children }: Props) => {
  return <code className={styles.root}>{children}</code>;
};

interface Props extends React.ComponentPropsWithoutRef<'code'> {}
