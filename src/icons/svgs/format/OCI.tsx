import { createIcon, SpecificIconProps } from '../../util/create-icon';

export const FormatOCIIcon = createIcon<SpecificIconProps>(
  'format/docker',
  ({ width = 576, height = 576, ...props }) => ({
    ...props,
    width,
    height,
    viewBox: '0 0 576 576',
    fill: 'black',
    children: (
      <>
			<polygon
        fillRule="evenodd"
        clipRule="evenodd"
        points="326.6,212.6 326.6,132.6 128.6,132.6 128.6,444.6 326.6,444.6 326.6,364.6 208.6,364.6 208.6,212.6"
        fill="currentColor"
      />
			<g>
				<rect x="366.5" y="132.6" width="79.9" height="79.9" fill="currentColor"/>
				<rect x="366.5" y="252.6" width="79.9" height="192" fill="currentColor"/>
			</g>
      <path d="M8.5,9.5v558.2h558.2V9.5H8.5z M486.4,484.7H88.7V92.6h397.8V484.7z"
      fill="currentColor"
      />
      </>
    ),
  }),
);
