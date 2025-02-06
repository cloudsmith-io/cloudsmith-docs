import { cva, VariantProps } from 'class-variance-authority';
import styles from './Note.module.css';

const defaultHeadings = {
  note: 'Note',
  tip: 'Tip',
  important: 'Important',
  warning: 'Warning',
  caution: 'Caution',
};

const note = cva(styles.root, {
  variants: {
    variant: {
      note: styles.variantNote,
      tip: styles.variantTip,
      important: styles.variantImportant,
      warning: styles.variantWarning,
      caution: styles.variantCaution,
    },
  },
  defaultVariants: {
    variant: 'note',
  },
});

export function Note({ variant, headline, children, ...rest }: NoteProps) {
  return (
    <blockquote className={note({ variant })} {...rest}>
      <p className={styles.headline}>{headline ?? defaultHeadings[variant ?? 'note']}</p>
      {children}
    </blockquote>
  );
}

type VariantsProps = VariantProps<typeof note>;

interface NoteProps extends VariantsProps, React.ComponentPropsWithoutRef<'blockquote'> {
  headline?: string;
}
