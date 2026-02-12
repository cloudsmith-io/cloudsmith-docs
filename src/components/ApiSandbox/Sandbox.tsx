'use client';

import { cx } from 'class-variance-authority';

import { ApiOperation } from '@/lib/swagger/types';

import { ApiTestProvider } from './context/ApiTestContext';
import { AuthProvider } from './context/AuthContext';
import { MediaProvider } from './context/MediaContext';
import { ParameterProvider } from './context/ParameterContext';
import styles from './Sandbox.module.css';
import SandboxInput from './SandboxInput';
import SandboxOutput from './SandboxOutput';

type SandboxProps = {
  className: string;
  currentOperation: ApiOperation;
  operations: ApiOperation[];
  onCloseSandbox: () => void;
  onChangeOperation: (op: ApiOperation) => void;
};

const Sandbox = ({
  className,
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
            <div className={cx(styles.root, className)}>
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

export default Sandbox;
