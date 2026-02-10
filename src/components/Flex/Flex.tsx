import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import type { FlexAlign, FlexDirection, FlexJustify, Space } from '@/lib/types';
import Slot from '@/components/Slot';

import css from './Flex.module.css';

const flex = cva(css.root, {
  variants: {
    direction: {
      row: css.directionRow,
      column: css.directionColumn,
    } satisfies Record<FlexDirection, string>,
    align: {
      start: css.alignStart,
      center: css.alignCenter,
      end: css.alignEnd,
      baseline: css.alignBaseline,
      stretch: css.alignStretch,
    } satisfies Record<FlexAlign, string>,
    justify: {
      start: css.justifyStart,
      center: css.justifyCenter,
      end: css.justifyEnd,
      between: css.justifyBetween,
    } satisfies Record<FlexJustify, string>,
    gap: {
      none: css.gapNone,
      '4xs': css.gap4xs,
      '3xs': css.gap3xs,
      '2xs': css.gap2xs,
      xs: css.gapXs,
      s: css.gapS,
      m: css.gapM,
      l: css.gapL,
      xl: css.gapXl,
      '2xl': css.gap2xl,
      '3xl': css.gap3xl,
      '4xl': css.gap4xl,
    } satisfies Record<Space | 'none', string>,
    padding: {
      '4xs': css.padding4xs,
      '3xs': css.padding3xs,
      '2xs': css.padding2xs,
      xs: css.paddingXs,
      s: css.paddingS,
      m: css.paddingM,
      l: css.paddingL,
      xl: css.paddingXl,
      '2xl': css.padding2xl,
      '3xl': css.padding3xl,
      '4xl': css.padding4xl,
    } satisfies Record<Space, string>,
    wrap: {
      true: css.wrap,
    },
  },
  defaultVariants: {
    align: 'center',
    direction: 'row',
    gap: 'm',
    justify: 'start',
    wrap: true,
  },
});

type FlexProps = React.HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof flex> & {
    asChild?: boolean;
    children: React.ReactNode;
    className?: string;
  };

export const Flex = ({
  align,
  asChild,
  children,
  className,
  direction,
  gap,
  justify,
  padding,
  wrap,
  ...rest
}: FlexProps) => {
  const Comp = asChild ? Slot : 'div';
  return (
    <Comp
      className={flex({ align, direction, gap, justify, padding, wrap, className })}
      {...rest}>
      {children}
    </Comp>
  );
};
