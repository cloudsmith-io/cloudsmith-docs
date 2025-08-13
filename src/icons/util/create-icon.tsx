// Default size of icons should be 16x16, but can be overridden by passing a width and height prop.
const defaultProps = {
  width: 16,
  height: 16,
  viewBox: '0 0 16 16',
};

const smallProps = {
  width: 12,
  height: 12,
  viewBox: '0 0 12 12',
};

export const createIcon = <Props extends RenderProps<Props>>(
  baseId: string,
  render: (props: Props) => React.SVGProps<SVGSVGElement>,
) => {
  const Icon = ({ as, title, id, size = 'default', ...props }: Props & IconProps) => {
    const { children, ...svgProps } = render(props as Props);
    const finalProps = { ...(size === 'small' ? smallProps : defaultProps), ...svgProps };

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

type BaseProps = {
  title: React.ReactNode;
  as?: 'svg' | 'use' | 'symbol';
  id?: string;
  size?: 'default' | 'small';
};

type RenderProps<Props extends object> = {
  [Key in keyof Props]: Key extends keyof BaseProps ? never : Props[Key];
};

export type IconProps = BaseProps & React.SVGProps<SVGSVGElement>;
export type SpecificIconProps = Omit<React.SVGProps<SVGSVGElement>, 'id'>;
