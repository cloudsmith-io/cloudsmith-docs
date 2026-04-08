// Copyright 2026 Cloudsmith Ltd

import { createIcon, SpecificIconProps } from '../util/create-icon';

export const BuildingIcon = createIcon<SpecificIconProps>(
  'building',
  ({ width = 16, height = 16, ...props }) => ({
    ...props,
    width,
    height,
    viewBox: '0 0 16 16',
    fill: 'none',
    children: (
      <>
        <path d="M6.5 10H5.5V9H6.5V10Z" fill="currentColor" />
        <path d="M8.5 10H7.5V9H8.5V10Z" fill="currentColor" />
        <path d="M6.5 8H5.5V7H6.5V8Z" fill="currentColor" />
        <path d="M8.5 8H7.5V7H8.5V8Z" fill="currentColor" />
        <path d="M6.5 6H5.5V5H6.5V6Z" fill="currentColor" />
        <path d="M8.5 6H7.5V5H8.5V6Z" fill="currentColor" />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M10.5 6.79297L12.5 8.79297V13.5H3.5V2.5H10.5V6.79297ZM4.5 12.5H6.5V11H7.5V12.5H9.5V3.5H4.5V12.5ZM10.5 12.5H11.5V9.20703L10.5 8.20703V12.5Z"
          fill="currentColor"
        />
      </>
    ),
  }),
);
