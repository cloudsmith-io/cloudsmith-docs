import { createIcon, SpecificIconProps } from '../../util/create-icon';

export const HomepageAPIIcon = createIcon<SpecificIconProps>(
  'homepage/api',
  ({ width = 44, height = 44, ...props }) => ({
    ...props,
    width,
    height,
    viewBox: '0 0 44 44',
    fill: 'none',
    children: (
      <>
        <path
          d="M15 17.5859V19.4141L10.707 23.707L9.29297 22.293L13 18.5859V18.4141L9.29297 14.707L10.707 13.293L15 17.5859Z"
          fill="currentColor"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M40 10.5859V32.4141L37.4141 35H6.58594L4 32.4141V10.5859L6.58594 8H37.4141L40 10.5859ZM6 11.4141V31.5859L7.41406 33H36.5859L38 31.5859V11.4141L36.5859 10H7.41406L6 11.4141Z"
          fill="currentColor"
        />
      </>
    ),
  }),
);
