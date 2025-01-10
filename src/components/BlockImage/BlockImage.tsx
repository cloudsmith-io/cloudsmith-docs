import { VariantProps, cva } from 'class-variance-authority';
import Image, { ImageProps } from 'next/image';

import styles from './BlockImage.module.css';

const blockImage = cva(styles.root, {
  variants: {
    align: {
      left: styles.alignLeft,
      right: styles.alignRight,
    },
    variant: {
      base: styles.variantBase,
    },
  },
  defaultVariants: {
    variant: 'base',
  },
});

/**
 * Component for rendering an image block with optional caption.
 *
 * @param {BlockImageProps} props - The properties for the BlockImage component.
 * @param {'left' | 'center' | 'right'} [align='center'] - The alignment of the image.
 * @param {'base'} [variant] - The variant style of the image block.
 * @param {React.ReactNode} [children] - Optional caption to be displayed below the image.
 * @param {ImageProps} props.rest - Additional properties to be passed to the Next.js Image component.
 *
 * @returns {JSX.Element} The rendered BlockImage component.
 */
export const BlockImage = ({ alt, align, variant, children, ...rest }: BlockImageProps) => {
  return (
    <div className={blockImage({ align, variant })}>
      <div className={styles.imageContainer}>
        <Image className={styles.image} alt={alt} {...rest} />
      </div>
      {children ? <div className={styles.caption}>{children}</div> : null}
    </div>
  );
};

type VariantsProps = VariantProps<typeof blockImage>;

interface BlockImageProps extends VariantsProps, ImageProps {
  children?: React.ReactNode;
}
