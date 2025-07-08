import { createIcon, SpecificIconProps } from '../../util/create-icon';

export const IntegrationRoadieIcon = createIcon<SpecificIconProps>(
  'integration/roadie',
  ({ width = 27, height = 31, ...props }) => ({
    ...props,
    width,
    height,
    viewBox: '0 0 27 31',
    fill: 'none',
    children: (
      <>
        <path
          d="M13.2866 26.835V25.6408L26.5937 17.9772L23.1749 16.0061L13.2866 21.6986V20.5086L26.516 12.8858L23.1013 10.9147L13.2866 16.5664V15.3722L26.6346 7.68407L13.2866 0L0 7.68407V23.0604L13.2866 30.7445L26.6346 23.0604L23.2403 21.1016L13.2866 26.835Z"
          fill="currentColor"
        />
      </>
    ),
  }),
);