import { VariantProps, cva } from 'class-variance-authority';

import styles from './code.module.css';

const code = cva(styles.root, {
  variants: {
    size: {
      h1: 'test',
    },
  },
  // defaultVariants: {

  // },
});

export function Code({ size, ...rest }: Code.Props) {
  return <div className={code({ size })} {...rest} />;
}

export namespace Code {
  type VariantsProps = VariantProps<typeof code>;

  export interface Props
    extends React.HTMLAttributes<HTMLHeadingElement>,
      Omit<VariantsProps, 'size'>,
      Required<Pick<VariantsProps, 'size'>> {}
}
