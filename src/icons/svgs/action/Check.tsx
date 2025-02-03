import { createIcon } from '../../util/create-icon';

export const ActionCheckIcon = createIcon('action/check', ({ ...props }) => ({
  ...props,
  fill: 'none',
  children: (
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M8.58082 12.8469L14.4277 5.34262L13.6388 4.72801L8.09225 11.8469L7.40817 11.8469L4.01006 8.00688L3.26118 8.66958L6.95777 12.8469L8.58082 12.8469Z"
      fill="currentcolor"
    />
  ),
}));
