'use client';

import { useEffect, useMemo, useState } from 'react';

import { useApi } from '@/lib/operations/api/hooks';
import { defaultMedia } from '@/lib/operations/constants';
import { useAuthState, usePathParamsState } from '@/lib/operations/param-state/hooks';
import {
  BodyParamState,
  ComposedParamState,
  ParamState,
  QueryParamState,
  SimpleParamState,
} from '@/lib/operations/param-state/types';
import { defaultBodyParamState, defaultQueryParamState } from '@/lib/operations/param-state/util';
import { operationAuthOptions, operationParametersByType } from '@/lib/operations/util';
import { ApiOperation } from '@/lib/swagger/types';

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
  const pathsParameters = useMemo(
    () => operationParametersByType(currentOperation, 'path') ?? [],
    [currentOperation],
  );
  const queryParameters = useMemo(
    () => operationParametersByType(currentOperation, 'query') ?? [],
    [currentOperation],
  );
  const bodyParameters = currentOperation.requestBody;
  const auths = useMemo(() => operationAuthOptions(currentOperation), [currentOperation]);

  const { pathParamState, updatePathParam } = usePathParamsState(pathsParameters);
  const [queryParamState, setQueryParamState] = useState<QueryParamState>({});

  const [mediaState, setMediaState] = useState<string>(
    Object.keys(bodyParameters?.content ?? {})[0] ?? defaultMedia,
  );
  const [bodyParamState, setBodyParamState] = useState<BodyParamState>({});

  const { authState, setAuthValue, setCurrentAuth, toggleHideAuth } = useAuthState(auths);

  const paramState = useMemo(
    () => ({ path: pathParamState, query: queryParamState, body: bodyParamState }),
    [pathParamState, queryParamState, bodyParamState],
  );

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

  const { response, isFetching, call } = useApi({
    operation: currentOperation,
    paramState,
    authType: auths.includes(authState.current) ? authState.current : null,
    authValue: auths.includes(authState.current) ? authState[authState.current] : null,
    media: mediaState,
  });

  return (
    <div className={styles.root}>
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
        onCallApi={call}
        isFetchingResponse={isFetching}
        onCloseSandbox={onCloseSandbox}
        onUpdateCurrentHeader={setCurrentAuth}
        onToggleHideHeader={toggleHideAuth}
        onChangeMedia={setMediaState}
        onChangeHeader={setAuthValue}
        onChangeOperation={onChangeOperation}
        onUpdatePathState={updatePathParam}
        onUpdateQueryState={updateQueryParam}
        onUpdateBodyState={updateBodyParam}
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
    </div>
  );
};
