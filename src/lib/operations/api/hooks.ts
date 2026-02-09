import { useCallback, useEffect, useState } from 'react';

import { ApiOperation } from '@/lib/swagger/types';

import { defaultMedia } from '../constants';
import { AuthOption, BodyParamState, PathParamState, QueryParamState } from '../param-state/types';
import { operationKey } from '../util';
import { ApiCallTestResponse } from './type';
import { callApi, resolveApiRequestBody, resolveApiRequestHeaders, resolveApiRequestUrl } from './util';

export const useApi = ({
  operation,
  paramState,
  authType,
  authValue,
  media = defaultMedia,
}: {
  operation: ApiOperation;
  paramState: {
    path: PathParamState;
    query: QueryParamState;
    body: BodyParamState;
  };
  authType: AuthOption | null;
  authValue: string | null;
  media: string;
}) => {
  const [response, setResponse] = useState<ApiCallTestResponse | undefined>(undefined);
  const [isFetching, setIsFetching] = useState(false);

  const reset = useCallback(() => {
    setResponse(undefined);
  }, [setResponse]);

  const currentKey = operationKey(operation);
  useEffect(() => {
    reset();
  }, [currentKey, reset]);

  const call = () => {
    setIsFetching(true);
    setResponse(undefined);

    const url = resolveApiRequestUrl({
      operation,
      path: paramState.path,
      query: paramState.query,
    });

    const headers = resolveApiRequestHeaders({
      media,
      authType,
      authValue: authType === 'basic' && authValue === ':' ? null : authValue,
    });

    const { body, count: bodyCount } = resolveApiRequestBody({
      body: paramState.body,
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
  };

  return { response, isFetching, call, reset };
};
