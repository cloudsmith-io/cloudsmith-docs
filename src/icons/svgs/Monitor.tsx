// Copyright 2026 Cloudsmith Ltd

import { createIcon, SpecificIconProps } from '../util/create-icon';

export const MonitorIcon = createIcon<SpecificIconProps>(
  'monitor',
  ({ width = 16, height = 16, ...props }) => ({
    ...props,
    width,
    height,
    viewBox: '0 0 16 16',
    fill: 'none',
    children: (
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3.29289 3L2 4.29289V9.70711L3.29289 11H4.5V12.2071L5.29289 13H10.7071L11.5 12.2071V11H12.7071L14 9.70711V4.29289L12.7071 3H3.29289ZM10.5 11H5.5V11.7929L5.70711 12H10.2929L10.5 11.7929V11ZM3 4.70711L3.70711 4H12.2929L13 4.70711V9.29289L12.2929 10H3.70711L3 9.29289V4.70711Z"
        fill="currentColor"
      />
    ),
  }),
);
