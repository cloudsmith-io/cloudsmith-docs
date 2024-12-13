import styles from './Note.module.css';

export function Note({ headline, children, ...rest }: NoteProps) {
  return (
    <blockquote className={styles.root} {...rest}>
      {headline && <p className={styles.headline}>{headline}</p>}
      {children}
    </blockquote>
  );
}

interface NoteProps extends React.ComponentPropsWithoutRef<'blockquote'> {
  headline?: string;
}
