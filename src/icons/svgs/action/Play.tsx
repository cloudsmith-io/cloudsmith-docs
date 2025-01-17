import { createIcon } from '../../util/create-icon';

export const ActionPlayIcon = createIcon('action/play', (props) => ({
  ...props,
  fill: 'none',
  children: (
    <>
      <path d="M13 7.454v.939L6.63 14H6V2h.63L13 7.454Z" fill="currentColor" />
    </>
  ),
}));
