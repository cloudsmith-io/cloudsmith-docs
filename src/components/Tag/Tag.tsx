import { VariantProps, cva } from 'class-variance-authority';
import { OpenAPIV3 } from 'openapi-types';

import styles from './Tag.module.css';

const tagVariants = cva(styles.root, {
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
    size: 'medium',
    type: 'status',
  },
});

// Map the HttpRequestMethods to the color variant for easier consumption
const requestMethods: { [key in Tag.HttpRequestMethods]: Tag.VariantsProps['variant'] } = {
  get: 'neutral',
  put: 'neutral',
  post: 'green',
  delete: 'red',
  options: 'yellow',
  head: 'neutral',
  patch: 'neutral',
  trace: 'neutral',
};

// Map the HttpResponseStatusCodes to the color variant for easier consumption
const statusCodes: { [key in Tag.HttpResponseStatusCodes]: Tag.VariantsProps['variant'] } = {
  200: 'green',
  201: 'green',
  204: 'green',
  400: 'red',
};

export const Tag = ({ size, type, ...props }: Tag.Props) => {
  if ('method' in props) {
    const { method, children, ...rest } = props;

    return (
      <div className={tagVariants({ size, type, variant: requestMethods[method] })} {...rest}>
        {children || method}
      </div>
    );
  }

  if ('statusCode' in props) {
    const { statusCode, children, ...rest } = props;

    return (
      <div className={tagVariants({ size, type, variant: statusCodes[statusCode] })} {...rest}>
        {children || statusCode}
      </div>
    );
  }

  const { variant, ...rest } = props;

  return <div className={tagVariants({ size, type, variant })} {...rest} />;
};

export namespace Tag {
  export type VariantsProps = VariantProps<typeof tagVariants>;
  export type HttpRequestMethods = Lowercase<keyof typeof OpenAPIV3.HttpMethods>;
  export type HttpResponseStatusCodes = 200 | 201 | 204 | 400; // Supported status codes

  type DivElement = React.ComponentPropsWithoutRef<'div'>;

  interface withMethod extends DivElement, Omit<VariantsProps, 'variant'> {
    method: HttpRequestMethods;
  }

  interface withStatusCode extends DivElement, Omit<VariantsProps, 'variant'> {
    statusCode: HttpResponseStatusCodes;
  }

  interface withVariant
    extends DivElement,
      Omit<VariantsProps, 'variant'>,
      Required<Pick<VariantsProps, 'variant'>> {
    children: React.ReactNode;
  }

  export type Props = withMethod | withStatusCode | withVariant;
}
