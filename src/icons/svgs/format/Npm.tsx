import { createIcon } from '../../util/create-icon';

export const FormatNpmIcon = createIcon('format/npm', (props) => ({
  ...props,
  fill: 'none',
  children: (
    <>
      <path
        fillRule="evenodd"
        clip-rule="evenodd"
        d="M20 4H4V20H20V4ZM16.8 6.8H7.2V17.2H12V9.2H14.4V17.2H16.8V6.8Z"
        fill="currentColor"
      />
    </>
  ),
}));
