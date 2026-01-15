import React from 'react';

import type { IconName } from '@/icons';
import type { VariantProps } from 'class-variance-authority';

import { cva, cx } from 'class-variance-authority';
import Link from 'next/link';

import { Icon } from '@/icons';
import { ButtonColorScheme, ButtonSize, ButtonVariant, ButtonWidth } from '@/lib/types';

import styles from './Button.module.css';

const buttonVariants = cva(styles.root, {
  variants: {
    variant: {
      primary: styles.primary,
      secondary: styles.secondary,
      link: styles.link,
    } satisfies Record<ButtonVariant, string>,
    colorScheme: {
      accent: styles.accent,
      text: styles.textColor,
      dark: styles.dark,
      light: styles.light,
    } satisfies Record<ButtonColorScheme, string>,
    size: {
      small: styles.sizeSmall,
      medium: styles.sizeMedium,
      large: styles.sizeLarge,
      xlarge: styles.sizeXlarge,
    } satisfies Record<ButtonSize, string>,
    width: {
      auto: styles.widthAuto,
      small: styles.widthSmall,
      medium: styles.widthMedium,
      large: styles.widthLarge,
      full: styles.widthFull,
    } satisfies Record<ButtonWidth, string>,
  },
  defaultVariants: {
    variant: 'primary',
    colorScheme: 'accent',
    size: 'medium',
    width: 'auto',
  },
});

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  href?: string;
  withArrow?: boolean;
  isExternalLink?: boolean;
  className?: string;
  icon?: IconName;
}

export function Button({
  variant,
  colorScheme,
  size,
  children,
  href,
  className,
  width,
  withArrow = false,
  icon,
  disabled,
  isExternalLink = false,
  ...rest
}: ButtonProps) {
  const cssClasses = buttonVariants({
    variant,
    colorScheme,
    size,
    width,
    className,
  });

  const content = (
    <>
      {icon && <Icon name={icon} title="" className={styles.icon} />}
      {children}
      {withArrow && <Icon name="arrow" title="" />}
      {variant === 'secondary' && (
        <>
          <span className={cx(styles.secondaryBorderFill, styles.topLeft)} aria-hidden />
          <span className={cx(styles.secondaryBorderFill, styles.topRight)} aria-hidden />
          <span className={cx(styles.secondaryBorderFill, styles.bottomLeft)} aria-hidden />
          <span className={cx(styles.secondaryBorderFill, styles.bottomRight)} aria-hidden />
        </>
      )}
    </>
  );

  if (href == null)
    return (
      <button aria-disabled={disabled ? true : undefined} className={cssClasses} {...rest}>
        {content}
      </button>
    );

  const linkProps = rest as React.AnchorHTMLAttributes<HTMLAnchorElement>;

  return (
    <Link
      aria-disabled={disabled ? true : undefined}
      prefetch={false}
      href={href}
      className={cssClasses}
      target={isExternalLink ? '_blank' : undefined}
      rel={isExternalLink ? 'noopener noreferrer' : undefined}
      {...linkProps}>
      {content}
    </Link>
  );
}

Button.displayName = 'Button';

export { buttonVariants };
export type { ButtonProps };
