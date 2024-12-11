const defaultProps = {
  width: 16,
  height: 16,
  viewBox: '0 0 16 16',
};

export const createIcon = <Props extends RenderProps<Props>>(
  baseId: string,
  render: (props: Props) => React.SVGProps<SVGSVGElement>,
) => {
  const Icon = ({ as, title, id, ...props }: Props & IconProps) => {
    const { children, ...svgProps } = render(props as Props);

    if (as === 'use') {
      return (
        <svg {...defaultProps} {...svgProps}>
          <title>{title}</title>
          <use href={`#${id || baseId}`} />
        </svg>
      );
    }

    if (as === 'symbol') {
      return (
        <svg {...defaultProps} {...svgProps} style={{ display: 'none' }} aria-hidden="true">
          <symbol id={id || baseId}>{children}</symbol>
        </svg>
      );
    }

    // Default to SVG
    return (
      <svg {...defaultProps} {...svgProps}>
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
};

type RenderProps<Props extends object> = {
  [Key in keyof Props]: Key extends keyof BaseProps ? never : Props[Key];
};

export type IconProps = BaseProps & React.SVGProps<SVGSVGElement>;
