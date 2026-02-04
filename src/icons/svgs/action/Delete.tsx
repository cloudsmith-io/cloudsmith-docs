import { createIcon } from '../../util/create-icon';

export const DeleteIcon = createIcon('action/delete', ({ ...props }) => ({
  ...props,
  fill: 'none',
  children: (
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M10.0661 1.93262H5.93309L5.08799 4.15701H2.92969V5.15701H13.0695V4.15701H10.9112L10.0661 1.93262ZM9.8415 4.15701L9.37632 2.93262L6.62291 2.93262L6.15773 4.15701H9.8415ZM11.0436 6.11403L10.457 12.0694L9.45807 13.0683H6.50672L5.50889 12.0705L4.95604 6.11672L3.96008 6.20656L4.54549 12.5213L6.09251 14.0683H9.87228L11.4182 12.5224L12.039 6.20925L11.0436 6.11403ZM7.49957 11.686V6.45276H8.49957V11.686H7.49957Z"
      fill="currentColor"
    />
  ),
}));
