import { VariantProps, cva } from 'class-variance-authority';
import { OpenAPIV3 } from 'openapi-types';

import styles from './Method.module.css';

const methodVariants = cva(styles.root, {
  variants: {
    size: {
      small: styles.small,
      medium: styles.medium,
    },
    type: {
      package: styles.package,
      status: styles.status,
    },
    variant: {
      neutral: styles.neutral,
      green: styles.green,
      yellow: styles.yellow,
      red: styles.red,
      grey: styles.grey,
    },
    active: {
      true: styles.active,
    },
  },
  defaultVariants: {
    size: 'small',
    type: 'package',
  },
});

export const Method = ({ size, type, ...props }: Method.Props) => {
  if ('method' in props) {
    const { method, children, ...rest } = props;

    // Map the HttpMethods to the color variant for easier consumption
    const methods: { [key in Method.HttpMethods]: Method.VariantsProps['variant'] } = {
      get: 'neutral',
      put: 'neutral',
      post: 'green',
      delete: 'red',
      options: 'yellow',
      head: 'neutral',
      patch: 'neutral',
      trace: 'neutral',
    };

    return (
      <div className={methodVariants({ size, type, variant: methods[method] })} {...rest}>
        {children || method}
      </div>
    );
  }

  const { variant, ...rest } = props;

  return <div className={methodVariants({ size, type, variant })} {...rest} />;
};

export namespace Method {
  export type VariantsProps = VariantProps<typeof methodVariants>;
  export type HttpMethods = Lowercase<keyof typeof OpenAPIV3.HttpMethods>;

  type DivElement = React.ComponentPropsWithoutRef<'div'>;

  interface withMethod extends DivElement, Omit<VariantsProps, 'variant'> {
    method: HttpMethods;
  }

  interface withVariant
    extends DivElement,
      Omit<VariantsProps, 'variant'>,
      Required<Pick<VariantsProps, 'variant'>> {
    children: React.ReactNode;
  }

  export type Props = withMethod | withVariant;
}
