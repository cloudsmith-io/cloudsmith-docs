import styles from './Table.module.css';

export function Table(props: React.ComponentPropsWithoutRef<'table'>) {
  return <table className={styles.root} {...props} />;
}
