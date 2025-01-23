import { createIcon } from '../util/create-icon';

export const CloseIcon = createIcon('close', (props) => ({
  ...props,
  fill: 'none',
  children: (
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M7.293 8L4.11 11.182l.707.707L8 8.707l3.182 3.182.707-.707L8.707 8l3.182-3.182-.707-.707L8 7.293 4.818 4.11l-.707.707L7.293 8z"
      fill="currentColor"
    />
  ),
}));
