import { createIcon, SpecificIconProps } from '../../util/create-icon';

export const UtilityGuideIcon = createIcon<SpecificIconProps>(
  'utility/guide',
  ({ width = 44, height = 44, ...props }) => ({
    ...props,
    width,
    height,
    viewBox: '0 0 44 44',
    fill: 'none',
    children: (
      <>
        <path
          d="M2.65234 9.75224L4.92223 12.0221L28.8293 12.0221L33.6914 7.15922V5.8629L28.8293 1L4.92223 1L2.65234 3.26989L2.65234 9.75224Z"
          stroke="var(--base-color-blue-500)"
          strokeWidth="1.86255"
        />
        <path
          d="M32.0391 24.521L29.7692 26.7909H5.86208L0.999962 21.928V20.6317L5.86208 15.7688L29.7692 15.7688L32.0391 18.0387V24.521Z"
          stroke="var(--base-color-blue-500)"
          strokeWidth="1.86255"
        />
        <path
          d="M17.0908 37V26.7896M17.0908 15.7686V12.019"
          stroke="var(--base-color-blue-500)"
          strokeWidth="1.86255"
        />
      </>
    ),
  }),
);
