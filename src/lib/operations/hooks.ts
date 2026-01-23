import { useCallback, useState } from 'react';

import { operationUrl } from '@/lib/operations/util';
import { ApiOperation } from '@/lib/swagger/types';

import { callApi } from './server';

export const useApi = (
  op: ApiOperation,
  parameters: {
    path: Record<string, string>;
  },
  header: 'apikey' | 'basic' | null,
  headerValue: string | null,
) => {
  const [response, setResponse] = useState<{ status: number; body: object } | undefined>(undefined);
  const [isFetching, setIsFetching] = useState(false);

  const call = () => {
    setIsFetching(true);
    setResponse(undefined);

    const baseUrl = operationUrl(op);

    const pathReplacedUrl = Object.entries(parameters.path).reduce((url, current) => {
      const [param, value] = current;
      const template = `{${param}}`;
      if (value !== '' && url.includes(template)) {
        return url.replaceAll(`{${param}}`, value);
      }
      return url;
    }, baseUrl);

    const cleanedUrl = pathReplacedUrl.replaceAll('\{', '').replaceAll('\}', '');

    const headers: HeadersInit = {
      accept: 'application/json',
      'content-type': 'application/json',
    };

    if (header && headerValue) {
      const headerKey = header === 'apikey' ? 'X-Api-Key' : 'authorization';
      const value = header === 'apikey' ? headerValue : `Basic ${btoa(headerValue)}`;
      headers[headerKey] = value;
    }

    callApi(cleanedUrl, headers)
      .then((response) => {
        setResponse(response);
      })
      .catch((response) => {
        setResponse(response);
      })
      .finally(() => setIsFetching(false));
  };

  const reset = useCallback(() => {
    setResponse(undefined);
  }, [setResponse]);

  return { response, isFetching, call, reset };
};
