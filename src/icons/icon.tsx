import { iconRegistry } from './icon-registry';
import { IconProps } from './util/create-icon';

export const Icon = (props: { name: IconName } & IconProps) => {
  if (!iconRegistry[props.name]) {
    throw new Error(`Icon "${props.name}" does not exist, check the icon registry for typos`);
  }

  const Component = iconRegistry[props.name];

  return <Component {...props} />;
};

export type IconName = keyof typeof iconRegistry;
