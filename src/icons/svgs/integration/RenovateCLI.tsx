import { createIcon, SpecificIconProps } from '../../util/create-icon';

export const IntegrationRenovateCLIIcon = createIcon<SpecificIconProps>(
  'integration/renovatecli',
  ({ width = 24, height = 24, ...props }) => ({
    ...props,
    width,
    height,
    viewBox: '0 0 24 24',
    fill: 'none',
    children: (
      <>
        <path
          d="M13.061 3.722l-.707-.707a1 1 0 00-1.414 0L2.454 11.5a1 1 0 000 1.414l2.829 2.829a1 1 0 001.414 0l8.485-8.486a1 1 0 000-1.414l-.707-.707.707-.707 2.829 2.828-7.071 7.071 7.778 7.779a1 1 0 001.414 0l1.414-1.415a1 1 0 000-1.414l-6.364-6.364 5.657-5.657L15.182 1.6z"
          fill="currentColor"
        />
      </>
    ),
  }),
);