import { createIcon, SpecificIconProps } from '../../util/create-icon';

export const FormatTerraformIcon = createIcon<SpecificIconProps>(
  'format/terraform',
  ({ width = 24, height = 24, ...props }) => ({
    ...props,
    width,
    height,
    viewBox: '0 0 24 24',
    fill: 'none',
    children: (
      <>
        <path
          d="M4.18172 3.1156V8.72388L9.03927 11.5299V5.91937L4.18172 3.1156ZM19.8183 6.24513L14.9607 9.05187V14.6594L19.8175 11.8556L19.8183 6.24513ZM9.57159 6.24736V11.8556L14.4291 14.6594V9.05187L9.57159 6.24736ZM9.57159 12.4701V18.0784L14.4284 20.8844V15.2739L9.57159 12.4701Z"
          fill="currentColor"
        />
      </>
    ),
  }),
);
