import { VariantProps, cva } from 'class-variance-authority';

import styles from './Method.module.css';

const method = cva(styles.root, {
  variants: {
    size: {
      small: styles.small,
      medium: styles.medium,
    },
    type: {
      get: styles.get,
      put: styles.put,
      post: styles.post,
      delete: styles.delete,
      options: styles.options,
      head: styles.head,
      patch: styles.patch,
      trace: styles.trace,
    },
    active: {
      true: styles.active,
    },
  },
  defaultVariants: {
    size: 'small',
  },
});

export function Method({ type, active, size, ...rest }: Method.Props) {
  return <div className={method({ type, active, size })} {...rest} />;
}

export namespace Method {
  type VariantsProps = VariantProps<typeof method>;

  export interface Props
    extends React.ComponentPropsWithoutRef<'div'>,
      Omit<VariantsProps, 'type'>,
      Required<Pick<VariantsProps, 'type'>> {
    children: React.ReactNode;
  }
}
