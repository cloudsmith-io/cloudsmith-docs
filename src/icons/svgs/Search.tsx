import { createIcon } from '../util/create-icon';

export const SearchIcon = createIcon('search', () => ({
  fill: 'none',
  children: (
    <>
      <rect
        y="9.1001"
        width="4.67842"
        height="1.05988"
        transform="rotate(-45 0 9.1001)"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6.05796 6.24159C7.48885 6.24159 8.64881 5.08162 8.64881 3.65073C8.64881 2.21985 7.48885 1.05988 6.05796 1.05988C4.62707 1.05988 3.46711 2.21985 3.46711 3.65073C3.46711 5.08162 4.62707 6.24159 6.05796 6.24159ZM6.05796 7.30147C8.07421 7.30147 9.7087 5.66698 9.7087 3.65073C9.7087 1.63449 8.07421 0 6.05796 0C4.04172 0 2.40723 1.63449 2.40723 3.65073C2.40723 5.66698 4.04172 7.30147 6.05796 7.30147Z"
        fill="currentColor"
      />
    </>
  ),
}));
