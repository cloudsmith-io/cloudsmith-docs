'use client';

import { useEffect, useState } from 'react';

import * as RadixDialog from '@radix-ui/react-dialog';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';

import { Button } from '@/components/Button';
import { ApiOperation } from '@/lib/swagger/types';

import styles from './ApiSandboxDialog.module.css';
import { Sandbox } from './Sandbox';

type ApiSandboxDialogProps = {
  operation: ApiOperation;
  operations: ApiOperation[];
};

export const ApiSandboxDialog = ({ operation, operations }: ApiSandboxDialogProps) => {
  const [open, setOpen] = useState(false);

  const [currentOperation, setCurrentOperation] = useState<ApiOperation>(operation);

  useEffect(() => {
    if (open) {
      setCurrentOperation(operation);
    }
  }, [open]);

  return (
    <RadixDialog.Root open={open} onOpenChange={setOpen}>
      <RadixDialog.Trigger asChild>
        <Button withArrow size="medium" width="large">
          Try it out
        </Button>
      </RadixDialog.Trigger>

      <RadixDialog.Portal>
        <RadixDialog.Overlay className={styles.overlay}>
          <RadixDialog.Content className={styles.content}>
            <VisuallyHidden>
              <RadixDialog.Title>Try API</RadixDialog.Title>
              <RadixDialog.Description>API Sandbox</RadixDialog.Description>
              <RadixDialog.Close></RadixDialog.Close>
            </VisuallyHidden>

            <div className={styles.main}>
              <Sandbox
                currentOperation={currentOperation}
                operations={operations}
                onChangeOperation={(o) => setCurrentOperation(o)}
              />
            </div>
          </RadixDialog.Content>
        </RadixDialog.Overlay>
      </RadixDialog.Portal>
    </RadixDialog.Root>
  );
};
