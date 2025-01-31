import { createIcon } from '../util/create-icon';

export const MenuIcon = createIcon('menu', (props) => ({
  ...props,
  fill: 'none',
  children: (
    <>
      <rect x="3" y="3.5" width="10" height="1" fill="currentColor" />
      <rect x="3" y="7.5" width="10" height="1" fill="currentColor" />
      <rect x="3" y="11.5" width="10" height="1" fill="currentColor" />
    </>
  ),
}));
