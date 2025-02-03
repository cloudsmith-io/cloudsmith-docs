import { Transition } from 'motion/react';
import * as motion from 'motion/react-client';
import { createIcon, SpecificIconProps } from '../util/create-icon';

export const ChevronIcon = createIcon<ChevronIconProps>(
  'chevron',
  ({ chevronDirection = 'up', transition = { duration: 1 }, ...props }) => ({
    ...props,
    children: (
      <motion.path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2.586 6.402l.707-.707 4.11 4.11h1.32L12.7 5.7l.718.696-4.274 4.408H6.988L2.586 6.402z"
        fill="var(--svg-path-fill)"
        animate={{ rotate: getRotationDeg[chevronDirection] }}
        transition={transition}
        initial={false}
      />
    ),
  }),
);

const getRotationDeg: Rotate = {
  up: '-180deg',
  right: '-90deg',
  down: '0deg',
  left: '90deg',
};

interface ChevronIconProps extends SpecificIconProps {
  chevronDirection?: Direction;
  transition?: Transition;
}

type Direction = 'up' | 'right' | 'down' | 'left';

type Rotate = {
  [key in Direction]: `${number}deg`;
};
