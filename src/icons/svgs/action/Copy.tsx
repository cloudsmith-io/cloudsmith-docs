import { createIcon } from '../../util/create-icon';

export const ActionCopyIcon = createIcon('action/copy', ({ ...props }) => ({
  ...props,
  fill: 'none',
  children: (
    <>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.15727 2.84198L11.6441 2.84198L12.937 4.13487V10.9023L11.6441 12.1952H7.15727L5.86438 10.9023L5.86438 4.13487L7.15727 2.84198ZM7.57149 3.84198L6.86438 4.54909V10.4881L7.57149 11.1952H11.2299L11.937 10.4881V4.54909L11.2299 3.84198L7.57149 3.84198Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4.34326 7.09592L5.01471 6.23125L4.22488 5.61792L3.34326 6.75325L3.34326 13.4849L4.63614 14.7778H9.0872L10.2225 13.8962L9.6092 13.1064L8.74453 13.7778H5.05036L4.34326 13.0707V7.09592Z"
        fill="currentColor"
      />
    </>
  ),
}));
