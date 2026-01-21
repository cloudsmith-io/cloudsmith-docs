'use client';

import { useEffect, useState } from 'react';

import * as RadixDialog from '@radix-ui/react-dialog';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';

import { ApiOperation } from '@/lib/swagger/types';

import { Button } from '../Button';
import styles from './ApiSandbox.module.css';
import SandboxInput from './SandboxInput';
import SandboxOutput from './SandboxOutput';

type ApiSandboxProps = {
  operation: ApiOperation;
  operations: ApiOperation[];
};

export const ApiSandbox = ({ operation, operations }: ApiSandboxProps) => {
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
              <SandboxInput
                operation={currentOperation}
                operations={operations}
                onChangeOperation={(o) => setCurrentOperation(o)}
              />
              <SandboxOutput operation={currentOperation} />
            </div>
          </RadixDialog.Content>
        </RadixDialog.Overlay>
      </RadixDialog.Portal>
    </RadixDialog.Root>
  );
};
