import { createIcon, SpecificIconProps } from '../util/create-icon';

export const InfoIcon = createIcon<SpecificIconProps>('info', ({ width = 16, height = 16, ...props }) => ({
  ...props,
  width,
  height,
  viewBox: '0 0 16 16',
  fill: 'none',
  children: (
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M8 14.5C11.3137 14.5 14 11.8137 14 8.5C14 5.18629 11.3137 2.5 8 2.5C4.68629 2.5 2 5.18629 2 8.5C2 11.8137 4.68629 14.5 8 14.5ZM10.1429 10.9107V11.5357L10.0536 11.625H5.94643L5.85714 11.5357V10.9107L5.94643 10.8214H7.64286L7.73214 10.7321V8.05356L7.64286 7.96428H6.39286L6.30357 7.87499V7.24999L6.39286 7.16071H8.53571L8.625 7.24999V10.7321L8.71429 10.8214H10.0536L10.1429 10.9107ZM8.71429 5.46428V6.35713L8.625 6.44642H7.55357L7.46429 6.35713V5.46428L7.55357 5.37499H8.625L8.71429 5.46428Z"
      fill="currentColor"
    />
  ),
}));
