'use client';

import { ApiOperation } from '@/lib/swagger/types';

import { ApiTestProvider } from './context/ApiTestContext';
import { AuthProvider } from './context/AuthContext';
import { MediaProvider } from './context/MediaContext';
import { ParameterProvider } from './context/ParameterContext';
import styles from './Sandbox.module.css';
import SandboxInput from './SandboxInput';
import SandboxOutput from './SandboxOutput';

type SandboxProps = {
  currentOperation: ApiOperation;
  operations: ApiOperation[];
  onCloseSandbox: () => void;
  onChangeOperation: (op: ApiOperation) => void;
};

export const Sandbox = ({
  currentOperation,
  operations,
  onChangeOperation,
  onCloseSandbox,
}: SandboxProps) => {
  return (
    <ParameterProvider operation={currentOperation}>
      <AuthProvider operation={currentOperation}>
        <MediaProvider operation={currentOperation}>
          <ApiTestProvider operation={currentOperation}>
            <div className={styles.root}>
              <SandboxInput
                operation={currentOperation}
                operations={operations}
                onCloseSandbox={onCloseSandbox}
                onChangeOperation={onChangeOperation}
              />

              <SandboxOutput operation={currentOperation} />
            </div>
          </ApiTestProvider>
        </MediaProvider>
      </AuthProvider>
    </ParameterProvider>
  );
};
