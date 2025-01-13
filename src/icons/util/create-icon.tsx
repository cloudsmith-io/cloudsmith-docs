const defaultProps = {
  width: 16,
  height: 16,
  viewBox: '0 0 16 16',
  'aria-hidden': false,
};

export const createIcon = <Props extends RenderProps<Props>>(
  baseId: string,
  render: (props: Props) => React.SVGProps<SVGSVGElement>,
) => {
  const Icon = ({ as, title, id, chevronDirection, ...props }: Props & IconProps) => {
    const { children, ...svgProps } = render({ chevronDirection, ...props } as Props);

    // Allow props to override defaults, but exclude custom props from SVG element
    const finalProps = { ...defaultProps, ...props, ...svgProps };

    if (as === 'use') {
      return (
        <svg {...finalProps}>
          <title>{title}</title>
          <use href={`#${id || baseId}`} />
        </svg>
      );
    }

    if (as === 'symbol') {
      return (
        <svg {...finalProps} style={{ display: 'none' }} focusable="false" aria-hidden="true">
          <symbol id={id || baseId}>{children}</symbol>
        </svg>
      );
    }

    // Default to SVG
    return (
      <svg {...finalProps}>
        <title>{title}</title>
        {children}
      </svg>
    );
  };

  return Icon;
};

// Basic SVG-related props
type SVGProps = React.SVGProps<SVGSVGElement>;

// Icon-specific props
type Direction = 'up' | 'down' | 'left' | 'right';

type IconBaseProps = {
  title: React.ReactNode;
  as?: 'svg' | 'use' | 'symbol';
  id?: string;
};

type IconCustomProps = {
  chevronDirection?: Direction;
};

// Combined props type
export type IconProps = IconBaseProps & IconCustomProps & SVGProps;

// Utility type for render function props
type RenderProps<Props extends object> = {
  [Key in keyof Props]: Key extends Exclude<keyof IconBaseProps, 'chevronDirection'> ? never : Props[Key];
};
