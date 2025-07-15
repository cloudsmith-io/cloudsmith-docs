import { cva, VariantProps } from 'class-variance-authority';
import { Icon, IconName } from '@/icons';
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
    noHeadline: {
      true: styles.noHeadline,
    },
  },
  defaultVariants: {
    variant: 'note',
    noHeadline: false,
  },
});

export function Note({ variant, headline, children, noHeadline, ...rest }: NoteProps) {
  return (
    <blockquote className={note({ variant, noHeadline })} {...rest}>
      {noHeadline ? (
        <Icon name="info" title="Info" className={styles.icon} />
      ) : (
        <p className={styles.headline}>{headline ?? defaultHeadings[variant ?? 'note']}</p>
      )}
      <span>{children}</span>
    </blockquote>
  );
}

type VariantsProps = VariantProps<typeof note>;

interface NoteProps extends VariantsProps, React.ComponentPropsWithoutRef<'blockquote'> {
  headline?: string;
  noHeadline?: boolean;
}
