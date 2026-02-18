import { createIcon } from '../../util/create-icon';

export const AddIcon = createIcon('action/add', ({ ...props }) => ({
  ...props,
  fill: 'none',
  children: (
    <>
      <g opacity="0.7" clipPath="url(#clip0_1663_18848)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M7.5 8.5V13H8.5V8.5H13V7.5H8.5V3H7.5V7.5H3V8.5H7.5Z"
          fill="currentColor"
        />
      </g>
      <defs>
        <clipPath id="clip0_1663_18848">
          <rect width="16" height="16" fill="white" />
        </clipPath>
      </defs>
    </>
  ),
}));
