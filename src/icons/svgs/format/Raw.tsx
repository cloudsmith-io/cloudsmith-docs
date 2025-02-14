import { createIcon, SpecificIconProps } from '../../util/create-icon';

export const FormatRawIcon = createIcon<SpecificIconProps>(
  'format/raw',
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
          d="M3.62944 14.892L3.62944 9.10803L5.13777 9.10803L5.13777 14.892L3.62944 14.892Z"
          fill="currentColor"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M15.0067 14.892L15.0067 9.10803L16.515 9.10803L16.515 14.892L15.0067 14.892Z"
          fill="currentColor"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M18.8622 14.892L18.8622 9.10803L20.3706 9.10803L20.3706 14.892L18.8622 14.892Z"
          fill="currentColor"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M10.0044 13.5381C10.8539 13.5381 11.5426 12.8495 11.5426 12C11.5426 11.1505 10.8539 10.4619 10.0044 10.4619C9.15497 10.4619 8.46634 11.1505 8.46634 12C8.46634 12.8495 9.15497 13.5381 10.0044 13.5381ZM10.0044 15.0464C11.6869 15.0464 13.0509 13.6825 13.0509 12C13.0509 10.3175 11.6869 8.95355 10.0044 8.95355C8.32194 8.95355 6.95801 10.3175 6.95801 12C6.95801 13.6825 8.32194 15.0464 10.0044 15.0464Z"
          fill="currentColor"
        />
      </>
    ),
  }),
);
