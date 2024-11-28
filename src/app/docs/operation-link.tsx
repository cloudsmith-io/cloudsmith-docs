'use client';

import Link, { LinkProps } from 'next/link';
import { useSelectedLayoutSegment } from 'next/navigation';

import { Method } from '@/components';

export function OperationLink({ method, operationId, children, ...linkProps }: Props) {
  const segment = useSelectedLayoutSegment();

  return (
    <Link {...linkProps}>
      {children}
      <Method type={method} active={segment === operationId}>
        {method}
      </Method>
    </Link>
  );
}

interface Props extends LinkProps {
  children: React.ReactNode;
  method: Method.Methods;
  operationId: string;
}
