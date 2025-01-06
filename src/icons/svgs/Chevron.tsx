import * as m from 'motion/react-m';

import { createIcon } from '../util/create-icon';

export const ChevronIcon = createIcon<ChevronIconProps>('chevron', ({ direction = 'right', ...props }) => ({
  ...props,
  children: (
    <m.path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M2.586 6.402l.707-.707 4.11 4.11h1.32L12.7 5.7l.718.696-4.274 4.408H6.988L2.586 6.402z"
      fill="var(--svg-path-fill)"
      animate={{ transform: `rotate(${rotate[direction]})` }}
    />
  ),
}));

const rotate: Rotate = {
  top: '-90deg',
  right: '0deg',
  bottom: '90deg',
  left: '180deg',
};

interface ChevronIconProps {
  direction?: Direction;
}

type Rotate = {
  [key in Direction]: `${number}deg`;
};

type Direction = 'top' | 'right' | 'bottom' | 'left';
