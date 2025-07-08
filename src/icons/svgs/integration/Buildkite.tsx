import { createIcon, SpecificIconProps } from '../../util/create-icon';

export const IntegrationBuildkiteIcon = createIcon<SpecificIconProps>(
  'integration/buildkite',
  ({ width = 500, height = 334, ...props }) => ({
    ...props,
    width,
    height,
    viewBox: '0 0 500 334',
    fill: 'none',
    children: (
      <>
        <path
          d="M325.189 4.10298L170.712 81.2949V247.995L325.189 170.803L325.189 4.10298ZM333.212 166.794L333.4 166.7V166.55L500 83.2998L333.4 0.0498047V0L333.35 0.0253906L333.3 0V0.0498047L333.212 0.0936777V166.794ZM162.688 81.2949V247.993L0 166.6V0L162.688 81.2949Z"
          fill="black"
        />
      </>
    ),
  }),
);