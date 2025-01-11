import { createIcon } from '../util/create-icon';

export const SearchIcon = createIcon('search', () => ({
  fill: 'none',
  children: (
    <>
      <rect y="9.09995" width="4.67842" height="1.05988" transform="rotate(-45 0 9.09995)" fill="currentColor" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6.05839 6.24159C7.48928 6.24159 8.64924 5.08162 8.64924 3.65073C8.64924 2.21985 7.48928 1.05988 6.05839 1.05988C4.6275 1.05988 3.46754 2.21985 3.46754 3.65073C3.46754 5.08162 4.6275 6.24159 6.05839 6.24159ZM6.05839 7.30147C8.07463 7.30147 9.70912 5.66698 9.70912 3.65073C9.70912 1.63449 8.07463 0 6.05839 0C4.04214 0 2.40765 1.63449 2.40765 3.65073C2.40765 5.66698 4.04214 7.30147 6.05839 7.30147Z"
        fill="currentColor"
      />
    </>
  ),
}));
