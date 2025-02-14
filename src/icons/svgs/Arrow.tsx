import { createIcon, SpecificIconProps } from '../util/create-icon';

export const ArrowIcon = createIcon<ArrowIconProps>('arrow', ({ arrowDirection = 'right', ...props }) => ({
  ...props,
  children: (
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M8.53779 12.9378L13.1335 8.85371L13.1335 7.12976L8.537 3.06226L7.8743 3.81114L12.0365 7.49435H2.86719V8.49435H12.0324L7.87351 12.1903L8.53779 12.9378Z"
      fill="currentColor"
      style={{ transform: `rotate(${rotate[arrowDirection]})`, transformOrigin: 'center' }}
    />
  ),
}));

const rotate: Rotate = {
  up: '-90deg',
  right: '0deg',
  down: '90deg',
  left: '180deg',
};

interface ArrowIconProps extends SpecificIconProps {
  arrowDirection?: Direction;
}

type Direction = 'right' | 'left' | 'up' | 'down';

type Rotate = {
  [key in Direction]: `${number}deg`;
};
