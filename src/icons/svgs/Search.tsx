import { createIcon, SpecificIconProps } from '../util/create-icon';

export const SearchIcon = createIcon<SpecificIconProps>(
  'search',
  ({ width = 16, height = 16, ...props }) => ({
    ...props,
    width,
    height,
    viewBox: '0 0 16 16',
    fill: 'none',
    children: (
      <>
        <path d="M3 12.5999L6.30814 9.2918L7.05759 10.0413L3.74945 13.3494L3 12.5999Z" fill="currentColor" />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M9.05839 9.74159C10.4893 9.74159 11.6492 8.58162 11.6492 7.15073C11.6492 5.71985 10.4893 4.55988 9.05839 4.55988C7.6275 4.55988 6.46754 5.71985 6.46754 7.15073C6.46754 8.58162 7.6275 9.74159 9.05839 9.74159ZM9.05839 10.8015C11.0746 10.8015 12.7091 9.16698 12.7091 7.15073C12.7091 5.13449 11.0746 3.5 9.05839 3.5C7.04214 3.5 5.40765 5.13449 5.40765 7.15073C5.40765 9.16698 7.04214 10.8015 9.05839 10.8015Z"
          fill="currentColor"
        />
      </>
    ),
  }),
);
