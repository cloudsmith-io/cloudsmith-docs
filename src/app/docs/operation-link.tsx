'use client';

import Link, { LinkProps } from 'next/link';
import { useSelectedLayoutSegment } from 'next/navigation';

import { Method } from '../../_components/method/method';

export function OperationLink({ method, operationId, children, ...linkProps }: Props) {
  const segment = useSelectedLayoutSegment();

  return (
    <Link {...linkProps}>
      {children}
      <Method type={method as Method.Methods} state={segment === operationId} />
    </Link>
  );
}

interface Props extends LinkProps {
  children: React.ReactNode;
  method: Method.Methods;
  operationId: string;
}
