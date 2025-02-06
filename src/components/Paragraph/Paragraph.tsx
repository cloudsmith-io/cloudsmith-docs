import styles from './Paragraph.module.css';

export function Paragraph(props: React.ComponentPropsWithoutRef<'p'>) {
  return <p className={styles.root} {...props} />;
}
