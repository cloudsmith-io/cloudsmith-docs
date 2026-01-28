import { createIcon, SpecificIconProps } from '../util/create-icon';

export const QuestionIcon = createIcon<SpecificIconProps>(
  'question',
  ({ width = 16, height = 16, ...props }) => ({
    ...props,
    width,
    height,
    viewBox: '0 0 16 16',
    fill: 'none',
    children: (
      <path
        d="M8 0C12.4182 0 15.9998 3.60921 16 8.02734C16 12.4456 12.4183 16.0557 8 16.0557C3.58172 16.0557 0 12.4456 0 8.02734C0.000168536 3.60921 3.58183 0 8 0ZM7.41504 10.1406V10.2891L7.98633 10.8809H8.12891L8.7002 10.2891V10.1406L8.12891 9.54883H7.98633L7.41504 10.1406ZM6.93066 5.13379L6.52539 5.52246L6.41602 5.62793V6.6709H7.13086V5.93359L7.32324 5.74902H8.67285L8.86426 5.93262V6.80859L7.69531 7.97754V8.92383H8.41113V8.27441L9.58008 7.10547V5.62793L9.46973 5.52246L9.06445 5.13379L8.96094 5.03418H7.03418L6.93066 5.13379Z"
        fill="currentColor"
      />
    ),
  }),
);
