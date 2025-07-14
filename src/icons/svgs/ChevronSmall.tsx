import { Transition } from 'motion/react';
import * as motion from 'motion/react-client';
import { createIcon, SpecificIconProps } from '../util/create-icon';

export const ChevronSmallIcon = createIcon<ChevronSmallIconProps>(
  'chevronSmall',
  ({ chevronDirection = 'up', transition = { duration: 1 }, ...props }) => ({
    ...props,
    children: (
      <motion.path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2.68994 4.70024L3.22028 4.16992L6.30219 7.25196H7.29208L10.2765 4.17404L10.815 4.69613L7.60954 8.00196H5.99152L2.68994 4.70024Z"
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

interface ChevronSmallIconProps extends SpecificIconProps {
  chevronDirection?: Direction;
  transition?: Transition;
}

type Direction = 'up' | 'right' | 'down' | 'left';

type Rotate = {
  [key in Direction]: `${number}deg`;
};
