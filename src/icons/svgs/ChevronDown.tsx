import { createIcon } from '../util/create-icon';

export const ChevronDownIcon = createIcon('chevronDown', () => ({
  fill: 'none',
  children: (
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M2.58603 6.40237L3.29315 5.69528L7.40236 9.80466H8.72222L12.7015 5.70077L13.4194 6.39689L9.14549 10.8047H6.98813L2.58603 6.40237Z"
      fill="var(--color-text-primary)"
    />
  ),
}));
