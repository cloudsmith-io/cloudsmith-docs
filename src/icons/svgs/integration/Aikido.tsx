import { createIcon, SpecificIconProps } from '../../util/create-icon';

export const IntegrationChainguardIcon = createIcon<SpecificIconProps>(
  'integration/chainguard',
  ({ width = 164, height = 184, ...props }) => ({
    ...props,
    width,
    height,
    viewBox: '0 0 164 184',
    fill: 'none',
    children: (
      <>
        <path d="M164 0H0V57.7747H164V0Z" fill="#141031"/>
        <path d="M0 111.964C46.6561 69.855 117.344 69.855 164 111.964V183.967L163.968 184L82 101.05L0.0321526 184L0 183.967V111.964Z" fill="#141031"/>
      </>
    ),
  }),
);