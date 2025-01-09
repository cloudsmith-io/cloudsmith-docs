import { VariantProps, cva } from 'class-variance-authority';
import Link from 'next/link';
import { Icon } from '@/icons';
import styles from './Card.module.css';

const card = cva(styles.root, {
  variants: {
    size: {
      s: styles.sizeSmall,
      m: styles.sizeMedium,
      l: styles.sizeLarge,
    },
    width: {
      third: styles.widthThird,
      half: styles.widthHalf,
      full: styles.widthFull,
    },
  },
  defaultVariants: {
    size: 'm',
    width: 'third',
  },
});

export function Card({
  title,
  description,
  href,
  linkText,
  icon,
  backgroundImage,
  size,
  width,
  className,
  ...rest
}: CardProps) {
  return (
    <Link href={href} className={card({ size, width, className })} {...rest}>
      {backgroundImage && (
        <div
          className={styles.background}
          style={{ backgroundImage: `url(${backgroundImage})` }}
          aria-hidden="true"
        />
      )}

      <div className={styles.icon}>
        <Icon name={icon} title="" />
      </div>

      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        {description && <p className={styles.description}>{description}</p>}

        <div className={styles.link}>
          <span className={styles.linkText}>{linkText}</span>
          <Icon name="arrow" title="" as="symbol" />
        </div>
      </div>
    </Link>
  );
}

type CardBaseProps = {
  title: string;
  description?: string;
  href: string;
  linkText: string;
  icon: 'documentation' | 'guide' | 'apiReference';
  backgroundImage?: string;
  className?: string;
};

type CardProps = CardBaseProps &
  VariantProps<typeof card> &
  Omit<React.ComponentPropsWithoutRef<'a'>, keyof CardBaseProps>;
