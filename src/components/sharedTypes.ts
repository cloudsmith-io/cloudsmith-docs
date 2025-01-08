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
  export type Space =
    | 'none'
    | '4xs'
    | '3xs'
    | '2xs'
    | 'xs'
    | 's'
    | 'm'
    | 'l'
    | 'xl'
    | '2xl'
    | '3xl'
    | '4xl';
  
  /* THEMES
   * =========================== */
  export type Theme = 'default' | 'uncover';
  export type Background =
    | 'default'
    | 'neutral'
    | 'accent'
    | 'accentLight'
    | 'accentDark';
  
  /* BORDER RADII
   * =========================== */
  export type Radius = 'xs' | 's' | 'm' | 'l' | 'full';