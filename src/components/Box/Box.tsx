import styles from './Box.module.css';

export const Box = ({ children }: BoxProps) => {
  return <div className={styles.root}>{children}</div>;
};

interface BoxProps {
  children: React.ReactNode;
}
