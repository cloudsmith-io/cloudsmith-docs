import { IconName } from '@/icons';

/* TYPOGRAPHY
 * =========================== */
export const lineHeights = {
  none: 'var(--line-height-none)',
  tight: 'var(--line-height-tight)',
  snug: 'var(--line-height-snug)',
  normal: 'var(--line-height-normal)',
  loose: 'var(--line-height-loose)',
};

export type LineHeight = keyof typeof lineHeights;

/* SPACING
 * =========================== */
export type Space = '4xs' | '3xs' | '2xs' | 'xs' | 's' | 'm' | 'l' | 'xl' | '2xl' | '3xl' | '4xl';

/* THEMES
 * =========================== */
export type Theme = 'default' | 'uncover';
export type Background = 'default' | 'neutral' | 'accent' | 'accentLight' | 'accentDark';

/* BORDER RADII
 * =========================== */
export type Radius = 'xs' | 's' | 'm' | 'l' | 'full';

/* FLEX
 * =========================== */
export type FlexAlign = 'start' | 'center' | 'end' | 'baseline' | 'stretch';
export type FlexDirection = 'row' | 'column';
export type FlexJustify = 'start' | 'center' | 'end' | 'between';

/* BUTTON
 * =========================== */
export type ButtonVariant = 'primary' | 'secondary' | 'link';
export type ButtonColorScheme = 'accent' | 'text' | 'dark' | 'light';
export type ButtonSize = 'small' | 'medium' | 'large' | 'xlarge';
export type ButtonWidth = 'auto' | 'small' | 'medium' | 'large' | 'full';

export interface ButtonVariants {
  variant?: ButtonVariant;
  colorScheme?: ButtonColorScheme;
  size?: ButtonSize;
  width?: ButtonWidth;
}

/* HOMEPAGE CONTENT
 * =========================== */
export interface Card {
  title: string;
  description: string;
  href: string;
  linkText: string;
  icon: IconName;
  size?: 'xs' | 's' | 'm' | 'l';
  width?: 'fifth' | 'quarter' | 'third' | 'half' | 'full';
  type?: 'default' | 'simple';
}

interface Button {
  label: string;
  href: string;
}

interface Hero {
  title: string;
  description: string;
  buttons: Button[];
}

interface CardSection {
  type: 'cards';
  heading: string;
  cards: Card[];
}

interface DividerSection {
  type: 'divider';
}

export type Section = CardSection | DividerSection;

export interface HomepageContent {
  hero?: Hero;
  sections?: Section[];
}
