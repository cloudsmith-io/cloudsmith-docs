import { createIcon, SpecificIconProps } from '../util/create-icon';

export const Heart = createIcon<SpecificIconProps>('heart', ({ width = 16, height = 16, ...props }) => ({
  ...props,
  width,
  height,
  viewBox: '0 0 16 16',
  fill: 'none',
  children: (
    <path
      d="M7.20703 3.5L8 4.29297L8.79297 3.5H11.707L13.5 5.29297V8.20703L8 13.707L2.5 8.20703V5.29297L4.29297 3.5H7.20703Z"
      fill="currentColor"
    />
  ),
}));
