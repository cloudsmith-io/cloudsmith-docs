import { VariantProps, cva } from 'class-variance-authority';

import styles from './method.module.css';

const method = cva(styles.base, {
  variants: {
    type: {
      get: styles.get,
      post: styles.post,
      put: styles.put,
      delete: styles.delete,
    },
    state: {
      true: styles.active,
    },
  },
});

export function Method({ type, state, ...rest }: Method.Props) {
  return (
    <div className={method({ type, state })} {...rest}>
      {type}
    </div>
  );
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
    extends React.HTMLAttributes<HTMLDivElement>,
      Omit<VariantsProps, 'type'>,
      Required<Pick<VariantsProps, 'type'>> {}
}
