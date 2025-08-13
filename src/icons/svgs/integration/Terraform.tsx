import { createIcon, SpecificIconProps } from '../../util/create-icon';

export const IntegrationTerraformIcon = createIcon<SpecificIconProps>(
  'integration/terraform',
  ({ width = 55, height = 61, ...props }) => ({
    ...props,
    width,
    height,
    viewBox: '0 0 55 61',
    fill: 'none',
    children: (
      <>
        <path d="M38.3235 20.7964V39.7264L54.7235 30.2664V11.3164L38.3235 20.7964Z" fill="currentColor" />
        <path d="M20.1234 11.3164L36.5234 20.7964V39.7264L20.1234 30.2564V11.3164Z" fill="currentColor" />
        <path
          d="M1.92346 0.74707V19.6871L18.3235 29.1571V10.2171L1.92346 0.74707ZM20.1235 51.2771L36.5235 60.7471V41.8071L20.1235 32.3371V51.2771Z"
          fill="currentColor"
        />
      </>
    ),
  }),
);
