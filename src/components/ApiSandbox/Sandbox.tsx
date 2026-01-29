'use client';

import { useEffect, useMemo, useState } from 'react';

import { getHeaderOptions, getParametersByParam } from '@/lib/operations/util';
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
  const headers = useMemo(() => getHeaderOptions(currentOperation), [currentOperation]);

  const [pathParamState, setPathParamState] = useState<Record<string, string>>({});
  const [queryParamState, setQueryParamState] = useState<Record<string, string>>({});
  const [bodyParamState, setBodyParamState] = useState<Record<string, Record<string, string>>>({});

  const [headersState, setHeadersState] = useState<{
    current: 'apikey' | 'basic';
    apikey: string;
    basic: string;
  }>({
    current: headers[0],
    apikey: '',
    basic: '',
  });

  const paramState = useMemo(
    () => ({ path: pathParamState, query: queryParamState, body: bodyParamState }),
    [pathParamState, queryParamState, bodyParamState],
  );

  const updatePathParam = (name: string, value: string) => {
    setPathParamState((v) => ({ ...v, [name]: value }));
  };
  const updateQueryParam = (name: string, value: string) => {
    setQueryParamState((v) => ({ ...v, [name]: value }));
  };
  const updateBodyParam = (media: string, name: string, value: string) => {
    setBodyParamState((v) => ({ ...v, [media]: { ...v[media], [name]: value } }));
  };

  useEffect(() => {
    setPathParamState(Object.fromEntries(pathsParameters.map((p) => [p.name, ''])));
  }, [pathsParameters]);

  useEffect(() => {
    setQueryParamState(
      Object.fromEntries(queryParameters.map((p) => [p.name, `${p.schema?.default ?? ''}`])),
    );
  }, [queryParameters]);

  useEffect(() => {
    setBodyParamState(
      Object.fromEntries(
        Object.entries(bodyParameters?.content ?? {}).map((entry) => [
          entry[0],
          Object.fromEntries(
            Object.entries(entry[1].schema?.properties ?? {}).map((e) => [e[0], e[1].default ?? '']),
          ),
        ]),
      ),
    );
  }, [bodyParameters]);

  useEffect(() => {
    if (headers.length > 0 && !headers.includes(headersState.current)) {
      setHeadersState((s) => ({ ...s, current: headers[0] }));
    }
  }, [headers, headersState]);

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
        headersState={headersState}
        headers={headers}
        currentHeader={headersState.current}
        onUpdateCurrentHeader={(h) => setHeadersState((s) => ({ ...s, current: h }))}
        onChangeHeader={(header, value) => setHeadersState((s) => ({ ...s, [header]: value }))}
        onChangeOperation={onChangeOperation}
        onUpdateState={(type, name, value, media = '') => {
          if (type === 'path') updatePathParam(name, value);
          if (type === 'query') updateQueryParam(name, value);
          if (type === 'body') updateBodyParam(media, name, value);
        }}
      />
      <SandboxOutput
        operation={currentOperation}
        paramState={paramState}
        header={headers.includes(headersState.current) ? headersState.current : null}
        headerValue={headers.includes(headersState.current) ? headersState[headersState.current] : null}
      />
    </>
  );
};
