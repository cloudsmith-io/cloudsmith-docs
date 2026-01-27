import { createIcon, SpecificIconProps } from '../../util/create-icon';

export const FormatGenericIcon = createIcon<SpecificIconProps>(
  'format/generic',
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
          d="M18.75 10.5588L13.4412 5.25H10.5588L5.25 10.5588V13.4412L10.5588 18.75H13.4412L18.75 13.4412V10.5588ZM20.25 14.0625V9.9375L14.0625 3.75H9.9375L3.75 9.9375V14.0625L9.9375 20.25H14.0625L20.25 14.0625Z"
          fill="currentColor"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M14.6894 12.0001L12.9697 10.2804L14.0304 9.21973L16.2804 11.4697V12.5304L14.0304 14.7804L12.9697 13.7197L14.6894 12.0001Z"
          fill="currentColor"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M9.31079 12.0001L11.0305 10.2804L9.9698 9.21973L7.7198 11.4697V12.5304L9.9698 14.7804L11.0305 13.7197L9.31079 12.0001Z"
          fill="currentColor"
        />
      </>
    ),
  }),
);
