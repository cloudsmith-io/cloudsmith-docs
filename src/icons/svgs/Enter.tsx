import { createIcon, SpecificIconProps } from '../util/create-icon';

export const EnterIcon = createIcon<SpecificIconProps>('enter', ({ width = 10, height = 8, ...props }) => ({
  ...props,
  width,
  height,
  viewBox: '0 0 10 8',
  fill: 'none',
  children: (
    <>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3.04703 7.72709L0.999976 5.79162L0.999962 4.74421L3.0481 2.81796L3.49996 3.27295L1.74792 4.96572H7.99996V5.57328H1.7507L3.49996 7.27295L3.04703 7.72709Z"
        fill="currentColor"
        fillOpacity="0.5"
      />
      <path
        d="M7.99996 5.57328V4.96572L8.49996 4.46572V0.272949H9.09766V4.74421L8.26858 5.57328H7.99996Z"
        fill="currentColor"
        fillOpacity="0.5"
      />
      <path
        d="M7.99996 4.96572H1.74792L3.49996 3.27295L3.0481 2.81796L0.999962 4.74421L0.999976 5.79162L3.04703 7.72709L3.49996 7.27295L1.7507 5.57328H7.99996M7.99996 4.96572V5.57328M7.99996 4.96572L8.49996 4.46572V0.272949H9.09766V4.74421L8.26858 5.57328H7.99996"
        stroke="currentColor"
        strokeOpacity="0.5"
        strokeWidth="0.2"
      />
    </>
  ),
}));
