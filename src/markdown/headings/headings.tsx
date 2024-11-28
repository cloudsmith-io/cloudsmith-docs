import { VariantProps, cva } from 'class-variance-authority';

import styles from './headings.module.css';

const defaultSize = 'h1' as const;
const headings = cva(styles.root, {
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

export function Headings({ size, ...rest }: Headings.Props) {
  const Tag = size || (defaultSize as typeof defaultSize);

  return <Tag className={headings({ size })} {...rest} />;
}

export namespace Headings {
  type VariantsProps = VariantProps<typeof headings>;

  export interface Props
    extends React.HTMLAttributes<HTMLHeadingElement>,
      Omit<VariantsProps, 'size'>,
      Required<Pick<VariantsProps, 'size'>> {}
}
