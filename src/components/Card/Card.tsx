import { type VariantProps, cva, cx } from 'class-variance-authority';
import Link from 'next/link';
import { Icon, IconName } from '@/icons';
import styles from './Card.module.css';

const card = cva(styles.root, {
  variants: {
    size: {
      xs: styles.sizeXSmall,
      s: styles.sizeSmall,
      m: styles.sizeMedium,
      l: styles.sizeLarge,
    },
    width: {
      fifth: styles.widthFifth,
      quarter: styles.widthQuarter,
      third: styles.widthThird,
      half: styles.widthHalf,
      full: styles.widthFull,
    },
    type: {
      simple: styles.typeSimple,
    },
  },
  defaultVariants: {
    size: 's',
    width: 'third',
  },
});

export function Card({
  title,
  description,
  href,
  linkText,
  icon,
  iconProps,
  backgroundImage,
  size,
  width,
  type,
  className,
  ...rest
}: CardProps) {
  return (
    <Link href={href} className={card({ size, width, type, className })} {...rest}>
      {type !== 'simple' ? (
        <>
          {backgroundImage && (
            <div
              className={styles.background}
              style={{ backgroundImage: `url(${backgroundImage})` }}
              aria-hidden="true"
            />
          )}
          <div className={styles.icon}>
            <Icon name={icon} title="" {...iconProps} />
          </div>
          <div className={styles.content}>
            <h3 className={cx(styles.title, 'headlineS')}>{title}</h3>
            {description && <p className={cx(styles.description, 'bodyS')}>{description}</p>}
            <div className={styles.link}>
              <span className={cx(styles.linkText, 'headlineXXS')}>{linkText || title}</span>
              <Icon name="arrow" title="" />
            </div>
          </div>
        </>
      ) : (
        <>
          {backgroundImage && (
            <div
              className={styles.background}
              style={{ backgroundImage: `url(${backgroundImage})` }}
              aria-hidden="true"
            />
          )}
          <div className={styles.top}>
            <div className={styles.icon}>
              <Icon name={icon} title="" {...iconProps} />
            </div>
            <h3 className={cx(styles.title, 'headlineXXS')}>{title}</h3>
          </div>
          <div className={styles.bottom}>
            {description && <p className={cx(styles.description, 'bodyS')}>{description}</p>}
          </div>
          <div className={styles.arrow}>
            <Icon name="arrow" title="" />
          </div>
        </>
      )}
    </Link>
  );
}

type CardBaseProps = {
  title: string;
  description?: string;
  href: string;
  linkText?: string;
  icon: IconName;
  iconProps?: React.ComponentProps<typeof Icon>;
  backgroundImage?: string;
  className?: string;
};

type CardProps = CardBaseProps &
  VariantProps<typeof card> &
  Omit<React.ComponentPropsWithoutRef<'a'>, keyof CardBaseProps>;
