'use client';

import { useEffect, useMemo, useState } from 'react';

import { defaultMedia } from '@/lib/operations/constants';
import { useApi } from '@/lib/operations/hooks';
import {
  BodyParamState,
  ComposedParamState,
  ParamState,
  PathParamState,
  QueryParamState,
  SimpleParamState,
  StringParamState,
} from '@/lib/operations/types';
import {
  defaultBodyParamState,
  defaultPathParamState,
  defaultQueryParamState,
  getAuthOptions,
  getParametersByParam,
  operationKey,
} from '@/lib/operations/util';
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
  const auths = useMemo(() => getAuthOptions(currentOperation), [currentOperation]);

  const [pathParamState, setPathParamState] = useState<PathParamState>({});
  const [queryParamState, setQueryParamState] = useState<QueryParamState>({});

  const [mediaState, setMediaState] = useState<string>(
    Object.keys(bodyParameters?.content ?? {})[0] ?? defaultMedia,
  );
  const [bodyParamState, setBodyParamState] = useState<BodyParamState>({});

  const [authState, setAuthState] = useState<{
    current: 'apikey' | 'basic';
    apikey: string;
    basic: string;
    hidden: boolean;
  }>({
    current: auths[0],
    hidden: false,
    apikey: '',
    basic: '',
  });

  const paramState = useMemo(
    () => ({ path: pathParamState, query: queryParamState, body: bodyParamState }),
    [pathParamState, queryParamState, bodyParamState],
  );

  const updatePathParam = (name: string, value: StringParamState) => {
    setPathParamState((v) => {
      return { ...v, [name]: value };
    });
  };

  const updateQueryParam = (name: string, value: SimpleParamState) => {
    setQueryParamState((v) => ({ ...v, [name]: value }));
  };

  const updateBodyParam = (keys: string[], value: ParamState | undefined) => {
    setBodyParamState((v) => {
      const newV = { ...v };

      const media = keys[0];

      let currentOld: ParamState = v[media];
      newV[media] = currentOld;
      let currentNew: ParamState = newV[media];

      for (let index = 1; index < keys.length; index++) {
        const key = keys[index];

        if (index === keys.length - 1) {
          if (value !== undefined) {
            (currentNew as ComposedParamState).items[key] = value;
          } else {
            delete (currentNew as ComposedParamState).items[key];
          }
        } else {
          currentOld = (currentOld as ComposedParamState).items[key];
          currentNew = {
            ...(currentNew as ComposedParamState),
            items: { ...(currentNew as ComposedParamState).items, [key]: currentOld },
          };
          currentNew = (currentNew as ComposedParamState).items[key];
        }
      }

      return Object.fromEntries(Object.entries(newV).map(([k, v]) => [k, v]));
    });
  };

  useEffect(() => {
    setPathParamState(defaultPathParamState(pathsParameters));
  }, [pathsParameters]);

  useEffect(() => {
    setQueryParamState(defaultQueryParamState(queryParameters));
  }, [queryParameters]);

  useEffect(() => {
    setBodyParamState(defaultBodyParamState(bodyParameters));
  }, [bodyParameters]);

  useEffect(() => {
    const mediaTypes = Object.keys(bodyParameters?.content ?? {});
    if (mediaTypes.length > 0 && !mediaTypes.includes(mediaState)) {
      setMediaState(mediaTypes[0]);
    } else if (mediaTypes.length === 0 && mediaState !== defaultMedia) {
      setMediaState(defaultMedia);
    }
  }, [bodyParameters, mediaState]);

  useEffect(() => {
    if (auths.length > 0 && !auths.includes(authState.current)) {
      setAuthState((s) => ({ ...s, current: auths[0] }));
    }
  }, [auths, authState]);

  const { response, isFetching, call, reset } = useApi(
    currentOperation,
    paramState,
    auths.includes(authState.current) ? authState.current : null,
    auths.includes(authState.current) ? authState[authState.current] : null,
    mediaState,
  );

  const currentKey = operationKey(currentOperation);
  useEffect(() => {
    reset();
  }, [currentKey, reset]);

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
        media={mediaState}
        authState={authState}
        auths={auths}
        currentHeader={authState.current}
        onCallApi={() => call()}
        isFetchingResponse={isFetching}
        onUpdateCurrentHeader={(h) => setAuthState((s) => ({ ...s, current: h }))}
        onToggleHideHeader={() => setAuthState((s) => ({ ...s, hidden: !s.hidden }))}
        onChangeMedia={(m) => setMediaState(m)}
        onChangeHeader={(header, value) => setAuthState((s) => ({ ...s, [header]: value }))}
        onChangeOperation={onChangeOperation}
        onUpdatePathState={updatePathParam}
        onUpdateQueryState={updateQueryParam}
        onUpdateBodyState={(keys, value) => {
          updateBodyParam(keys, value);
        }}
      />
      <SandboxOutput
        operation={currentOperation}
        paramState={paramState}
        media={mediaState}
        auth={auths.includes(authState.current) ? authState.current : null}
        authValue={auths.includes(authState.current) ? authState[authState.current] : null}
        hiddenAuth={authState.hidden}
        response={response}
      />
    </>
  );
};
