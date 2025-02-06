import styles from './HorizontalRule.module.css';

export function HorizontalRule(props: React.ComponentPropsWithoutRef<'hr'>) {
  return <hr className={styles.root} {...props} />;
}
