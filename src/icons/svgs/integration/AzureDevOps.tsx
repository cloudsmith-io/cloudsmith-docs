import { createIcon, SpecificIconProps } from '../../util/create-icon';

export const IntegrationAzureDevOpsIcon = createIcon<SpecificIconProps>(
  'integration/azuredevops',
  ({ width = 53, height = 53, ...props }) => ({
    ...props,
    width,
    height,
    viewBox: '0 0 53 53',
    fill: 'none',
    children: (
      <>
        <path
          d="M0 19.2743L4.87883 12.8321L23.1283 5.41509V0.0477295L39.1305 11.7573L6.43996 18.1039V35.9626L0 34.104V19.2743ZM52.1103 9.61214V41.4233L39.619 52.0625L19.4198 45.4249V52.0603L6.43996 35.9582L39.1327 39.8622V11.7573L52.1103 9.61214Z"
          fill="currentColor"
        />
      </>
    ),
  }),
);