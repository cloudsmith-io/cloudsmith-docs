import { createIcon, SpecificIconProps } from '../../util/create-icon';

export const HomepageDocumentationIcon = createIcon<SpecificIconProps>(
  'homepage/documentation',
  ({ width = 44, height = 44, ...props }) => ({
    ...props,
    width,
    height,
    viewBox: '0 0 44 44',
    fill: 'none',
    children: (
      <>
        <path
          d="M18.5 37H8V35H18.5V37ZM34.5 8.58594V34.4141L31.9141 37H22V35H31.0859L32.5 33.5859V9.41406L31.0859 8H13.9141L12.5 9.41406V24H10.5V8.58594L13.0859 6H31.9141L34.5 8.58594ZM22.5 32.5H8V30.5H22.5V32.5ZM19.5 28H8V26H19.5V28Z"
          fill="currentColor"
        />
      </>
    ),
  }),
);
