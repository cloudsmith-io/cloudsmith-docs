import { createIcon, SpecificIconProps } from '../../util/create-icon';

export const HomepageGuideIcon = createIcon<SpecificIconProps>(
  'homepage/guide',
  ({ width = 44, height = 44, ...props }) => ({
    ...props,
    width,
    height,
    viewBox: '0 0 44 44',
    fill: 'none',
    children: (
      <>
        <path
          d="M23 20H32.1475L35 22.8506V28.1494L32.1475 31H23V40H21V31H11.4414L7 26.5615V24.4385L11.4414 20H21V17H11.8525L9 14.1494V8.85059L11.8525 6H32.5586L37 10.4385V12.5615L32.5586 17H23V20ZM9 25.2676V25.7314L12.2695 29H31.3193L33 27.3193V23.6797L31.3193 22H12.2695L9 25.2676ZM11 9.67969V13.3193L12.6807 15H31.7305L35 11.7314V11.2676L31.7305 8H12.6807L11 9.67969Z"
          fill="currentColor"
        />
      </>
    ),
  }),
);
