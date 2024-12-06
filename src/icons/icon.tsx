import { iconRegistry } from './icon-registry';
import { IconProps } from './util/create-icon';

export const Icon = (props: { name: keyof typeof iconRegistry } & IconProps) => {
  if (!iconRegistry[props.name]) {
    throw new Error(`Icon ${props.name} does not exist`);
  }

  const Component = iconRegistry[props.name];

  return <Component {...props} />;
};
