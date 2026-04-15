// Copyright 2026 Cloudsmith Ltd

import { createIcon, SpecificIconProps } from '../util/create-icon';

export const StarIcon = createIcon<SpecificIconProps>('star', ({ width = 16, height = 16, ...props }) => ({
  ...props,
  width,
  height,
  viewBox: '0 0 16 16',
  fill: 'none',
  children: (
    <g transform="translate(2 2)">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.6899 4.22908L7.72857 3.89517L6.18777 0H5.67378L4.13298 3.89517L0.196172 4.22702L0 4.76898L3.02188 7.49076L2.10248 11.5434L2.55014 11.8841L5.93078 9.71295L9.27628 11.8615L9.75514 11.5261L8.83967 7.49076L11.8795 4.75283L11.6899 4.22908ZM9.95017 5.11107L7.0092 4.86316L5.93078 2.13689L4.85235 4.86316L1.91138 5.11107L4.15445 7.13138L3.48946 10.0627L5.93078 8.49477L8.37209 10.0627L7.7071 7.13138L9.95017 5.11107Z"
        fill="currentColor"
      />
    </g>
  ),
}));
