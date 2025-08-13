import { createIcon, SpecificIconProps } from '../../util/create-icon';

export const IntegrationGCPCloudBuildIcon = createIcon<SpecificIconProps>(
  'integration/gcpcloudbuild',
  ({ width = 24, height = 24, ...props }) => ({
    ...props,
    width,
    height,
    viewBox: '0 0 24 24',
    fill: 'none',
    children: (
      <>
        <path d="M12.15 16.24l3.52-2.03v-4.06l-1.18-.69-3.52 6.1 1.18.68zM8.63 10.15v4.06l1.18.68 3.53-6.09-1.18-.69-3.53 2.04zM11.46 17.45L7.24 15.01v-4.86l-3.75-2.17v9.2l7.97 4.6v-4.33zM7.93 8.95l4.22-2.44 4.22 2.44 3.76-2.17L12.15 2.17 4.17 6.78l3.76 2.17zM17.06 15.01l-4.22 2.44v4.33l7.98-4.6V7.98l-3.76 2.17v4.86z" fill="black"
        />
      </>
    ),
  }),
);