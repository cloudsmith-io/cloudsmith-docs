import { createIcon, SpecificIconProps } from '../../util/create-icon';

export const FormatNpmIcon = createIcon<SpecificIconProps>(
  'format/npm',
  ({ width = 24, height = 24, ...props }) => ({
    ...props,
    width,
    height,
    viewBox: '0 0 24 24',
    fill: 'none',
    children: (
      <>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M20 4H4V20H20V4ZM16.8 6.8H7.2V17.2H12V9.2H14.4V17.2H16.8V6.8Z"
          fill="currentColor"
        />
      </>
    ),
  }),
);
