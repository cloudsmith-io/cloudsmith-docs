import { type VariantProps, cva } from 'class-variance-authority';
import Link from 'next/link';
import { Icon, IconName } from '@/icons';
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
        <Icon
          name={icon}
          title=""
          aria-hidden="true"
          focusable="false"
          width={44}
          height={44}
          viewBox="0 0 44 44"
        />
      </div>

      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        {description && <p className={styles.description}>{description}</p>}

        <div className={styles.link}>
          <span className={styles.linkText}>{linkText}</span>
          <Icon name="arrow" title="" aria-hidden="true" focusable="false" />
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
  icon: IconName;
  backgroundImage?: string;
  className?: string;
};

type CardProps = CardBaseProps &
  VariantProps<typeof card> &
  Omit<React.ComponentPropsWithoutRef<'a'>, keyof CardBaseProps>;
