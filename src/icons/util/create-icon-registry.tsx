import { IconProps } from './create-icon';

export const createIconRegistry = <Names extends string>(
  icons: Record<Names, (props: IconProps) => React.JSX.Element>,
) => icons;
