import { VariantProps, cva } from 'class-variance-authority';

import styles from './Method.module.css';

const method = cva(styles.root, {
  variants: {
    type: {
      get: styles.get,
      post: styles.post,
      put: styles.put,
      delete: styles.delete,
    },
    active: {
      true: styles.active,
    },
  },
});

export function Method({ type, active, ...rest }: Method.Props) {
  return <div className={method({ type, active })} {...rest} />;
}

export namespace Method {
  export enum Methods {
    get = 'get',
    post = 'post',
    put = 'put',
    delete = 'delete',
  }

  type VariantsProps = VariantProps<typeof method>;

  export interface Props
    extends React.ComponentPropsWithoutRef<'div'>,
      Omit<VariantsProps, 'type'>,
      Required<Pick<VariantsProps, 'type'>> {
    children: React.ReactNode;
  }
}
