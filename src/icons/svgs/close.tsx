import { createIcon } from '../util/create-icon';

export const CloseIcon = createIcon('close', () => ({
  fill: 'none',
  children: (
    <>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.01555 2.03223L11.5024 2.03223L12.7953 3.32512V10.0926L11.5024 11.3855H7.01555L5.72266 10.0926L5.72266 3.32512L7.01555 2.03223ZM7.42976 3.03223L6.72266 3.73933V9.67836L7.42976 10.3855H11.0882L11.7953 9.67836V3.73933L11.0882 3.03223L7.42976 3.03223Z"
        fill="var(--base-color-grey-600)"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4.20312 6.2861L4.87457 5.42143L4.08474 4.80811L3.20312 5.94343L3.20313 12.6751L4.49601 13.968H8.94707L10.0824 13.0864L9.46907 12.2966L8.60439 12.968H4.91022L4.20312 12.2609V6.2861Z"
        fill="var(--base-color-grey-600)"
      />
    </>
  ),
}));
