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

const icons = {
  documentation: (
    <svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 44 44" fill="none">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.91037 4L7 7.35038V29.6865L9.91037 33.0368H26.1361L29.0465 29.6865V7.35038L26.1361 4H9.91037ZM10.66 5.61316L8.61316 7.93991V29.0969L10.66 31.4237H25.3865L27.4333 29.0969V7.93991L25.3864 5.61316H10.66ZM16.4185 36.4723H30.0493L32.9596 33.1219V10.7858H31.3465V32.5324L29.2996 34.8591H16.4185V36.4723ZM33.8448 40H22.3649V38.3868H33.0951L35.142 36.0601V17.0021H36.7552V36.6496L33.8448 40Z"
        fill="#2A6FE1"
      />
    </svg>
  ),
  guide: (
    <svg xmlns="http://www.w3.org/2000/svg" width="35" height="37" viewBox="0 0 35 37" fill="none">
      <path
        d="M2.65234 9.75224L4.92223 12.0221L28.8293 12.0221L33.6914 7.15922V5.8629L28.8293 1L4.92223 1L2.65234 3.26989L2.65234 9.75224Z"
        stroke="#2A6FE1"
        strokeWidth="1.86255"
      />
      <path
        d="M32.0391 24.521L29.7692 26.7909H5.86208L0.999962 21.928V20.6317L5.86208 15.7688L29.7692 15.7688L32.0391 18.0387V24.521Z"
        stroke="#2A6FE1"
        strokeWidth="1.86255"
      />
      <path d="M17.0908 37V26.7896M17.0908 15.7686V12.019" stroke="#2A6FE1" strokeWidth="1.86255" />
    </svg>
  ),
  apiReference: (
    <svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 44 44" fill="none">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.9863 7H29.6437L31.63 8.96949V17.6816H30.066V9.6212L28.9998 8.56396H6.63023L5.56396 9.6212V26.2743L6.63023 27.3315H20.9224V28.8955H5.9863L4 26.926V8.96949L5.9863 7ZM9.46422 13.4427L7.19268 11.3495L8.25252 10.1994L11.0282 12.7572L11.0282 14.2072L8.25956 16.8223L7.18564 15.6854L9.46422 13.5331V13.4427ZM11.5591 16.9051H15.7297V15.3411H11.5591V16.9051ZM23.4972 25.4459L28.8967 20.0464H32.6992L38.0987 25.4459V29.2484L32.6992 34.6479H28.8967L23.4972 29.2484V25.4459ZM25.0611 26.0937V28.6006L29.5445 33.084H32.0514L36.5348 28.6006V26.0937L32.0514 21.6104L29.5445 21.6104L25.0611 26.0937ZM28.8931 27.1022C28.8931 26.0225 29.7683 25.1473 30.848 25.1473C31.9277 25.1473 32.803 26.0225 32.803 27.1022C32.803 28.1819 31.9277 29.0572 30.848 29.0572C29.7683 29.0572 28.8931 28.1819 28.8931 27.1022ZM30.848 23.5833C28.9046 23.5833 27.3291 25.1588 27.3291 27.1022C27.3291 29.0457 28.9046 30.6211 30.848 30.6211C32.7915 30.6211 34.3669 29.0457 34.3669 27.1022C34.3669 25.1588 32.7915 23.5833 30.848 23.5833Z"
        fill="#2A6FE1"
      />
    </svg>
  ),
};

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

      <div className={styles.icon}>{icons[icon]}</div>

      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        {description && <p className={styles.description}>{description}</p>}

        <div className={styles.link}>
          <span className={styles.linkText}>{linkText}</span>
          <Icon name="arrow" title="" aria-hidden="true" />
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
  icon: keyof typeof icons;
  backgroundImage?: string;
  className?: string;
};

type CardProps = CardBaseProps &
  VariantProps<typeof card> &
  Omit<React.ComponentPropsWithoutRef<'a'>, keyof CardBaseProps>;
