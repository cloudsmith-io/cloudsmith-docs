import { createIcon, SpecificIconProps } from '../util/create-icon';

export const ExternalIcon = createIcon<SpecificIconProps>(
  'external',
  ({ width = 16, height = 16, ...props }) => ({
    ...props,
    width,
    height,
    viewBox: '0 0 16 16',
    fill: 'none',
    children: (
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M6.88786 10.2512L11.9222 5.21687L11.9222 8.89747L12.9222 8.89747L12.9222 4.55528L11.8767 3.50977L7.53453 3.50977L7.53453 4.50977L11.2151 4.50977L6.18076 9.54408L6.88786 10.2512ZM5.08507 5.69781H5.63363V4.69781H4.67086L4.52443 4.84424L3.0779 6.29077L3.07789 10.2638L3.07788 11.8979L4.67086 13.4909H5.09848H6.56832H10.2779L11.8708 11.8979L11.8708 10.9808L10.8708 10.9809L10.8708 11.4837L9.86365 12.4909H6.56832H5.09848H5.08507L4.07788 11.4837V10.8019L4.0779 6.70499L5.08507 5.69781Z"
        fill="currentColor"
      />
    ),
  }),
);
