import React from 'react';

const Slot = ({ children, ...props }: { children: React.ReactNode } & Record<string, unknown>) => {
  if (React.isValidElement(children)) {
    return React.cloneElement(children, {
      ...mergeProps(props as Record<string, unknown>, children.props as Record<string, unknown>),
    });
  }

  return React.Children.count(children) > 1 ? React.Children.only(null) : null;
};

/**
 * Taken 1:1 from Radix' Slot implementation
 */
function mergeProps(slotProps: Record<string, unknown>, childProps: Record<string, unknown>) {
  // all child props should override
  const overrideProps: Record<string, unknown> = { ...childProps };

  for (const propName in childProps) {
    const slotPropValue = slotProps[propName];
    const childPropValue = childProps[propName];

    const isHandler = /^on[A-Z]/.test(propName);
    if (isHandler) {
      // if the handler exists on both, we compose them
      if (slotPropValue && childPropValue) {
        overrideProps[propName] = (...args: unknown[]) => {
          (childPropValue as Function)(...args); // eslint-disable-line @typescript-eslint/no-unsafe-function-type
          (slotPropValue as Function)(...args); // eslint-disable-line @typescript-eslint/no-unsafe-function-type
        };
      }
      // but if it exists only on the slot, we use only this one
      else if (slotPropValue) {
        overrideProps[propName] = slotPropValue;
      }
    }
    // if it's `style`, we merge them
    else if (propName === 'style') {
      overrideProps[propName] = { ...(slotPropValue as object), ...(childPropValue as object) };
    } else if (propName === 'className') {
      overrideProps[propName] = [slotPropValue, childPropValue].filter(Boolean).join(' ');
    }
  }

  return { ...slotProps, ...overrideProps };
}

export default Slot;
