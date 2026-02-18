'use client';

import { useCallback, useEffect, useState } from 'react';

import * as RadixDialog from '@radix-ui/react-dialog';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { cx } from 'class-variance-authority';
import { useRouter, useSearchParams } from 'next/navigation';
import { ErrorBoundary } from 'react-error-boundary';

import { Button } from '@/components/Button';
import { operationPath } from '@/lib/operations/util';
import { ApiOperation } from '@/lib/swagger/types';

import styles from './ApiSandboxDialog.module.css';
import Sandbox from './Sandbox';
import SandboxError from './SandboxError';

type ApiSandboxDialogProps = {
  operation: ApiOperation;
  operations: ApiOperation[];
};

const SANDBOX_SEARCH_PARAM = 'sandbox';
const SANDBOX_OPEN_VALUE = 'open';

const ApiSandboxDialog = ({ operation, operations }: ApiSandboxDialogProps) => {
  const searchParams = useSearchParams();
  const sandbox = searchParams.get(SANDBOX_SEARCH_PARAM);

  const [open, setOpen] = useState(sandbox === SANDBOX_OPEN_VALUE);
  const [shouldAnimate, setShouldAnimate] = useState(sandbox !== SANDBOX_OPEN_VALUE);

  const router = useRouter();

  useEffect(() => {
    if (open && sandbox !== SANDBOX_OPEN_VALUE) {
      router.replace(`?${SANDBOX_SEARCH_PARAM}=${SANDBOX_OPEN_VALUE}`);
    }
  }, [open, sandbox, router]);

  useEffect(() => {
    if (!open) setShouldAnimate(true);
  }, [open]);

  const openChangeHandler = useCallback(
    (o: boolean) => {
      setOpen(o);
      if (!o) {
        router.replace(operationPath(operation.slug));
      }
    },
    [setOpen, router, operation],
  );
  const closeSandboxHandler = useCallback(() => setOpen(false), [setOpen]);
  const changeOperationHandler = useCallback(
    (o: ApiOperation) => {
      router.push(`${operationPath(o.slug)}/?${SANDBOX_SEARCH_PARAM}=${SANDBOX_OPEN_VALUE}`);
    },
    [router],
  );

  return (
    <RadixDialog.Root open={open} onOpenChange={openChangeHandler}>
      <RadixDialog.Trigger asChild>
        <Button className={styles.trigger} withArrow size="medium" width="large">
          Try it out
        </Button>
      </RadixDialog.Trigger>

      <RadixDialog.Portal>
        <RadixDialog.Overlay className={cx(styles.overlay, { [styles.animate]: shouldAnimate })}>
          <RadixDialog.Content className={cx(styles.content, { [styles.animate]: shouldAnimate })}>
            <VisuallyHidden>
              <RadixDialog.Title>Try API</RadixDialog.Title>
              <RadixDialog.Description>API Sandbox</RadixDialog.Description>
              <RadixDialog.Close></RadixDialog.Close>
            </VisuallyHidden>

            <ErrorBoundary fallback={<SandboxError />}>
              <Sandbox
                className={styles.sandbox}
                currentOperation={operation}
                operations={operations}
                onCloseSandbox={closeSandboxHandler}
                onChangeOperation={changeOperationHandler}
              />
            </ErrorBoundary>
          </RadixDialog.Content>
        </RadixDialog.Overlay>
      </RadixDialog.Portal>
    </RadixDialog.Root>
  );
};

export default ApiSandboxDialog;
