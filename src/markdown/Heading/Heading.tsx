import { VariantProps, cva, cx } from 'class-variance-authority';

import styles from './Heading.module.css';

const defaultSize = 'h1' as const;
const heading = cva(styles.root, {
  variants: {
    size: {
      h1: styles.h1,
      h2: styles.h2,
      h3: styles.h3,
      h4: styles.h4,
      h5: styles.h5,
      h6: styles.h6,
    },
  },
  defaultVariants: {
    size: defaultSize,
  },
});

export function Heading({ size, className, ...rest }: Heading.Props) {
  const Tag = size || (defaultSize as typeof defaultSize);

  return <Tag className={cx(heading({ size }), className)} {...rest} />;
}

export namespace Heading {
  type VariantsProps = VariantProps<typeof heading>;

  export interface Props
    extends React.ComponentPropsWithoutRef<'h1'>,
      Omit<VariantsProps, 'size'>,
      Required<Pick<VariantsProps, 'size'>> {}
}
