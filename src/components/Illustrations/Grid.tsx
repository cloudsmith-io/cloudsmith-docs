import { useId } from 'react';

const Grid = () => {
  const id = useId();

  return (
    <svg width="100%" height="518" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id={id} width={40} height={40} patternUnits="userSpaceOnUse">
          <g
            stroke={'var(--grid-color, var(--color-grid-line-default))'}
            strokeWidth={1.5}
            strokeDasharray="3 3">
            <line x1={0} y1={0} x2={0} y2={40} />
            <line x1={0} y1={0} x2={40} y2={0} />
          </g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
};

export { Grid };
