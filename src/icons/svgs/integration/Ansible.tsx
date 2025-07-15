import { createIcon, SpecificIconProps } from '../../util/create-icon';

export const IntegrationAnsibleIcon = createIcon<SpecificIconProps>(
  'integration/ansible',
  ({ width = 69, height = 69, ...props }) => ({
    ...props,
    width,
    height,
    viewBox: '0 0 69 69',
    fill: 'none',
    children: (
      <>
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M34.5 69C53.5547 69 69 53.5547 69 34.5001C69 15.447 53.5547 0 34.5 0C15.4469 0 0 15.447 0 34.5001C0 53.5547 15.4469 69 34.5 69ZM44.0086 43.1105L35.0807 21.0753L30.5231 32.4878L44.0086 43.1105ZM37.208 15.137L50.941 48.1865C51.0924 48.5908 51.1761 48.9667 51.1761 49.2037C51.1761 50.6593 50.0003 51.6677 48.6551 51.6677C47.9834 51.6677 47.4667 51.4058 46.7506 50.8267L28.9445 36.4416L22.9778 51.388H17.8217L32.8945 15.137C33.2865 14.1838 34.1275 13.6795 35.0807 13.6795C36.0321 13.6795 36.816 14.1839 37.208 15.137Z"
          fill="currentColor"
        />
      </>
    ),
  }),
);
