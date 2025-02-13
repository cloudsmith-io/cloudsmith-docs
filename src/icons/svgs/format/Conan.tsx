import { createIcon, SpecificIconProps } from '../../util/create-icon';

export const FormatConanIcon = createIcon<SpecificIconProps>(
  'format/conan',
  ({ width = 24, height = 24, ...props }) => ({
    ...props,
    width,
    height,
    viewBox: '0 0 24 24',
    fill: 'none',
    children: (
      <>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M11.9104 2.93402L3.49287 6.97008L3.49289 15.0164L11.9104 21.066L20.5071 15.4692V7.42797L11.9104 2.93402ZM14.9579 8.39162L17.1177 7.22522C17.1177 7.22522 13.8626 3.6727 10.0288 5.7355C8.22522 6.70598 7.68769 7.68135 8.48616 8.72281C9.80763 10.4466 11.4015 10.2531 11.4015 10.2531L13.48 9.24127C13.48 9.24127 11.2229 9.5391 10.2683 8.74838C9.48537 8.09966 9.81414 7.27395 10.8946 6.52154C11.8427 5.86136 13.7296 6.12739 14.3983 6.63232C15.0669 7.13711 15.3267 7.84312 14.9579 8.39162Z"
          fill="currentColor"
        />
      </>
    ),
  }),
);
