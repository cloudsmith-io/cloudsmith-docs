import React from 'react';
import { cx } from 'class-variance-authority';

import type { Space } from '@/components/sharedTypes';
import Slot from '@/components/Slot';

import css from './Flex.module.css';

type FlexProps = React.HTMLAttributes<HTMLDivElement> & {
  align?: 'start' | 'center' | 'end' | 'baseline' | 'stretch';
  direction?: 'row' | 'column';
  asChild?: boolean;
  children: React.ReactNode;
  className?: string;
  gap?: Space;
  padding?: Space;
  justify?: 'start' | 'center' | 'end' | 'between' | 'around';
  wrap?: boolean;
};

export const Flex = ({
  align = 'center',
  asChild,
  children,
  className,
  gap = 'm',
  padding = 'm',
  justify = 'start',
  direction = 'row',
  wrap = true,
  ...rest
}: FlexProps) => {
  const Comp = asChild ? Slot : 'div';
  return (
    <Comp
      className={cx(css.root, className)}
      data-direction={direction}
      data-align={align}
      data-justify={justify}
      data-gap={gap}
      data-padding={padding}
      data-wrap={wrap || null}
      {...rest}>
      {children}
    </Comp>
  );
};
