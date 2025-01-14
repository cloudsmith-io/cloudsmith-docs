import { createIcon } from '../../util/create-icon';

export const ActionLinkIcon = createIcon('action/link', () => ({
  fill: 'none',
  children: (
    <>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.6901 2.40894H11.5505L12.7402 3.59868V12.4013L11.5505 13.591H8.9633V12.591H11.1363L11.7402 11.9871V4.01289L11.1363 3.40894L6.10431 3.40894L5.50036 4.01289V7.24541H4.50036V3.59868L5.6901 2.40894ZM3.20068 9.58887H7.68866V8.58887H3.20068V9.58887ZM8.45996 11.5889H3.20068V10.5889H8.45996V11.5889ZM3.20068 13.5889H6.23181V12.5889H3.20068V13.5889Z"
        fill="currentColor"
      />
    </>
  ),
}));
