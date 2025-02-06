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
    mobileDarkMode: {
      true: styles.mobileDarkMode,
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
  401: 'red',
  403: 'red',
  404: 'red',
  417: 'red',
  422: 'red',
};

export const Tag = ({ size, type, active, mobileDarkMode, className, ...props }: Tag.Props) => {
  const sharedVariants = { size, type, active, mobileDarkMode };

  if ('method' in props) {
    const { method, children, ...rest } = props;

    return (
      <span
        className={tagVariants({ ...sharedVariants, variant: requestMethods[method], className })}
        {...rest}>
        {children || method}
      </span>
    );
  }

  if ('statusCode' in props) {
    const { statusCode, children, ...rest } = props;

    return (
      <span
        className={tagVariants({ ...sharedVariants, variant: statusCodes[statusCode], className })}
        {...rest}>
        {children || statusCode}
      </span>
    );
  }

  const { variant, ...rest } = props;

  return <span className={tagVariants({ ...sharedVariants, variant, className })} {...rest} />;
};

export namespace Tag {
  export type VariantsProps = VariantProps<typeof tagVariants>;
  export type HttpRequestMethods = Lowercase<keyof typeof OpenAPIV3.HttpMethods>;
  export type HttpResponseStatusCodes = 200 | 201 | 204 | 400 | 401 | 403 | 404 | 417 | 422; // Supported status codes

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

  interface defaultProps {
    mobileDarkMode?: boolean;
  }

  export type Props = (withMethod | withStatusCode | withVariant) & defaultProps;
}
