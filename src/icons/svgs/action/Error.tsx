import { createIcon, SpecificIconProps } from '../../util/create-icon';

export const ActionErrorIcon = createIcon<SpecificIconProps>(
  'action/error',
  ({ width = 17, height = 17, ...props }) => ({
    ...props,
    width,
    height,
    viewBox: '0 0 17 17',
    children: (
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.22525 3.32413L3.15295 7.39642V10.2235L7.22525 14.2958H10.0523L14.1246 10.2235V7.39642L10.0523 3.32413H7.22525ZM4.15295 9.80926V7.81063L7.63946 4.32413L9.63808 4.32413L13.1246 7.81063V9.80926L9.63808 13.2958L7.63946 13.2958L4.15295 9.80926ZM6.14968 8.27322H11.1279V9.37322H6.14968V8.27322Z"
        fill="currentColor"
      />
    ),
  }),
);
