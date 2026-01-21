'use client';

import { useEffect, useMemo, useState } from 'react';

import { getParametersByParam } from '@/lib/operations/util';
import { ApiOperation } from '@/lib/swagger/types';

import SandboxInput from './SandboxInput';
import SandboxOutput from './SandboxOutput';

type SandboxProps = {
  currentOperation: ApiOperation;
  operations: ApiOperation[];
  onChangeOperation: (op: ApiOperation) => void;
};

export const Sandbox = ({ currentOperation, operations, onChangeOperation }: SandboxProps) => {
  const pathsParameters = useMemo(
    () => getParametersByParam(currentOperation, 'path') ?? [],
    [currentOperation],
  );
  const queryParameters = useMemo(
    () => getParametersByParam(currentOperation, 'query') ?? [],
    [currentOperation],
  );
  const bodyParameters = currentOperation.requestBody;

  const [pathParamState, setPathParamState] = useState<Record<string, string>>({});

  const paramState = useMemo(() => ({ path: pathParamState }), [[pathParamState]]);

  const updatePathParam = (name: string, value: string) => {
    setPathParamState((v) => ({ ...v, [name]: value }));
  };

  useEffect(() => {
    setPathParamState(Object.fromEntries(pathsParameters.map((p) => [p.name, ''])));
  }, [pathsParameters]);

  return (
    <>
      <SandboxInput
        operation={currentOperation}
        operations={operations}
        paramState={paramState}
        parameters={{
          path: pathsParameters,
          query: queryParameters,
          body: bodyParameters,
        }}
        onChangeOperation={onChangeOperation}
        onUpdateState={(type, name, value) => {
          if (type === 'param') updatePathParam(name, value);
        }}
      />
      <SandboxOutput operation={currentOperation} paramState={paramState} />
    </>
  );
};
