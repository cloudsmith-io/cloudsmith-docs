import { createIcon, SpecificIconProps } from '../../util/create-icon';

export const IntegrationChefIcon = createIcon<SpecificIconProps>(
  'integration/chef',
  ({ width = 152.2, height = 162.5, ...props }) => ({
    ...props,
    width,
    height,
    viewBox: '0 0 152.2 162.5',
    fill: 'none',
    children: (
      <>
        <path d="M152.2,127.5c-0.1,2-1.2,3.8-2.8,4.9l-39.4,22.8V67.4l-76-43.9L73.3,0.7c1.8-0.9,3.9-0.9,5.7,0L152.2,43   L152.2,127.5z M93,77.1L40.9,47.2c-1.8-0.9-3.9-0.9-5.7,0L0.1,67.4L55,99.1v63.4l35.2-20.3c1.7-1.1,2.7-2.9,2.8-4.9V77.1z    M0.1,130.8l38,22.1v-44L0.1,130.8z"
        fill="currentColor"
        
        />
      </>
    ),
  }),
);