import { createContext, ReactNode, useCallback, useEffect, useMemo, useState } from 'react';

import { usePathParamsState } from '@/lib/operations/param-state/hooks';
import {
  BodyParamState,
  ComposedParamState,
  ParamState,
  PathParamState,
  QueryParamState,
  SimpleParamState,
  StringParamState,
} from '@/lib/operations/param-state/types';
import { defaultBodyParamState, defaultQueryParamState } from '@/lib/operations/param-state/util';
import { operationParametersByType } from '@/lib/operations/util';
import { ApiOperation, ParameterObject, RequestBodyObject } from '@/lib/swagger/types';

export const ParameterContext = createContext<{
  pathParameters: ParameterObject[];
  queryParameters: ParameterObject[];
  bodyParameters: RequestBodyObject | undefined;
  pathParamState: PathParamState;
  queryParamState: QueryParamState;
  bodyParamState: BodyParamState;
  updatePathParam: (name: string, value: StringParamState) => void;
  updateQueryParam: (name: string, value: SimpleParamState) => void;
  updateBodyParam: (keys: string[], value: ParamState | undefined) => void;
}>({
  pathParameters: [],
  queryParameters: [],
  bodyParameters: undefined,
  pathParamState: {},
  queryParamState: {},
  bodyParamState: {},
  updatePathParam: () => {},
  updateQueryParam: () => {},
  updateBodyParam: () => {},
});

type MediaProviderProps = {
  operation: ApiOperation;
  children: ReactNode;
};

export const ParameterProvider = ({ operation, children }: MediaProviderProps) => {
  const pathParameters = useMemo(() => operationParametersByType(operation, 'path') ?? [], [operation]);
  const queryParameters = useMemo(() => operationParametersByType(operation, 'query') ?? [], [operation]);
  const bodyParameters = operation.requestBody;

  const { pathParamState, updatePathParam } = usePathParamsState(pathParameters);
  const [queryParamState, setQueryParamState] = useState<QueryParamState>({});
  const [bodyParamState, setBodyParamState] = useState<BodyParamState>({});

  const updateQueryParam = useCallback(
    (name: string, value: SimpleParamState) => {
      setQueryParamState((v) => ({ ...v, [name]: value }));
    },
    [setQueryParamState],
  );

  const updateBodyParam = useCallback(
    (keys: string[], value: ParamState | undefined) => {
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
    },
    [setBodyParamState],
  );

  useEffect(() => {
    setQueryParamState(defaultQueryParamState(queryParameters));
  }, [queryParameters]);

  useEffect(() => {
    setBodyParamState(defaultBodyParamState(bodyParameters));
  }, [bodyParameters]);

  const contextValue = useMemo(() => {
    return {
      pathParameters,
      queryParameters,
      bodyParameters,
      pathParamState,
      queryParamState,
      bodyParamState,
      updatePathParam,
      updateQueryParam,
      updateBodyParam,
    };
  }, [
    pathParameters,
    queryParameters,
    bodyParameters,
    pathParamState,
    queryParamState,
    bodyParamState,
    updatePathParam,
    updateQueryParam,
    updateBodyParam,
  ]);

  return <ParameterContext.Provider value={contextValue}>{children}</ParameterContext.Provider>;
};
