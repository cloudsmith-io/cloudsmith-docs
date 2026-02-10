import { createContext, ReactNode, useCallback, useEffect, useMemo, useState } from 'react';

import { ApiCallTestResponse } from '@/lib/operations/api/type';
import {
  callApi,
  resolveApiRequestBody,
  resolveApiRequestHeaders,
  resolveApiRequestUrl,
} from '@/lib/operations/api/util';
import { operationKey } from '@/lib/operations/util';
import { ApiOperation } from '@/lib/swagger/types';

import { useAuth, useMedia, useParameters } from './hook';

export const ApiTestContext = createContext<{
  apiResponse: ApiCallTestResponse | undefined;
  isFetchingApi: boolean;
  callApi: () => void;
  resetApiResponse: () => void;
}>({
  apiResponse: undefined,
  isFetchingApi: false,
  callApi: () => {},
  resetApiResponse: () => {},
});

type ApiTestContextProviderProps = {
  operation: ApiOperation;
  children: ReactNode;
};

export const ApiTestProvider = ({ operation, children }: ApiTestContextProviderProps) => {
  const { authOption, authValue } = useAuth();

  const { pathParamState, queryParamState, bodyParamState } = useParameters();

  const { media } = useMedia();

  const [response, setResponse] = useState<ApiCallTestResponse | undefined>(undefined);
  const [isFetching, setIsFetching] = useState(false);

  const reset = useCallback(() => {
    setResponse(undefined);
  }, [setResponse]);

  const currentKey = operationKey(operation);
  useEffect(() => {
    reset();
  }, [currentKey, reset]);

  const call = useCallback(() => {
    setIsFetching(true);
    setResponse(undefined);

    const url = resolveApiRequestUrl({
      operation,
      path: pathParamState,
      query: queryParamState,
    });

    const headers = resolveApiRequestHeaders({
      media,
      authOption,
      authValue: authOption === 'basic' && authValue === ':' ? null : authValue,
    });

    const { body, count: bodyCount } = resolveApiRequestBody({
      body: bodyParamState,
      media,
    });

    callApi(url, operation.method, headers, bodyCount > 0 ? JSON.stringify(body) : undefined)
      .then((response) => {
        setResponse(response);
      })
      .catch((response) => {
        setResponse(response);
      })
      .finally(() => setIsFetching(false));
  }, [
    setIsFetching,
    setResponse,
    operation,
    pathParamState,
    queryParamState,
    bodyParamState,
    media,
    authOption,
    authValue,
  ]);

  const contextValue = useMemo(
    () => ({
      apiResponse: response,
      isFetchingApi: isFetching,
      callApi: call,
      resetApiResponse: reset,
    }),
    [response, isFetching, call, reset],
  );

  return <ApiTestContext.Provider value={contextValue}>{children}</ApiTestContext.Provider>;
};
