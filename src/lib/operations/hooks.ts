import { useCallback, useState } from 'react';

import {
  defaultBoolean,
  defaultNumber,
  defaultString,
  getParametersByParam,
  operationUrl,
  paramStateIsNullish,
  paramStateToValue,
} from '@/lib/operations/util';
import { ApiOperation } from '@/lib/swagger/types';

import { defaultMedia } from './constants';
import { BodyParamState, ObjectParamState, PathParamState, QueryParamState } from './types';

export const useApi = (
  op: ApiOperation,
  paramState: {
    path: PathParamState;
    query: QueryParamState;
    body: BodyParamState;
  },
  header: 'apikey' | 'basic' | null,
  headerValue: string | null,
  media: string = defaultMedia,
) => {
  const [response, setResponse] = useState<
    | {
        status: null;
        body: { error: string };
      }
    | {
        status: number;
        body: object;
      }
    | undefined
  >(undefined);
  const [isFetching, setIsFetching] = useState(false);

  const call = () => {
    setIsFetching(true);
    setResponse(undefined);

    const baseUrl = operationUrl(op);

    const pathReplacedUrl = Object.entries(paramState.path).reduce((url, current) => {
      const [param, state] = current;
      const value = state.value;
      const template = `{${param}}`;
      if (value !== '' && url.includes(template)) {
        return url.replaceAll(template, value);
      }
      return url;
    }, baseUrl);

    const cleanedUrl = pathReplacedUrl.replaceAll('\{', '').replaceAll('\}', '');

    const queryParams = getParametersByParam(op, 'query') ?? [];

    const finalUrl = Object.entries(paramState.query)
      .filter(([name, state]) => {
        const param = queryParams.find((p) => p.name === name);

        if (state.type === 'string') return defaultString(param?.schema?.default) !== state.value;
        if (state.type === 'boolean') return defaultBoolean(param?.schema?.default) !== state.value;
        if (state.type === 'integer') return defaultNumber(param?.schema?.default) !== state.value;
        if (state.type === 'number') return defaultNumber(param?.schema?.default) !== state.value;

        return false;
      })
      .reduce((url, current, index) => {
        let currenUrl: string = url;
        if (index === 0) {
          currenUrl += '?';
        } else {
          currenUrl += '&';
        }
        const [name, state] = current;
        currenUrl += `${name}=${state.value}`;

        return currenUrl;
      }, cleanedUrl);

    const headers: HeadersInit = {
      accept: 'application/json',
      'content-type': media,
    };

    if (header && headerValue && (header !== 'basic' || headerValue != ':')) {
      const headerKey = header === 'apikey' ? 'X-Api-Key' : 'authorization';
      const value = header === 'apikey' ? headerValue : `Basic ${btoa(headerValue)}`;
      headers[headerKey] = value;
    }

    const body: Record<string, unknown> = {};
    if (paramState.body && media === defaultMedia && paramState.body[media]) {
      const bodyParams = paramState.body[media] as ObjectParamState;

      const filtered: ObjectParamState = {
        ...bodyParams,
        items: Object.fromEntries(
          Object.entries(bodyParams.items).filter((entry) => !paramStateIsNullish(entry[1])),
        ),
      };

      if (Object.keys(filtered.items).length > 0) {
        Object.entries(paramStateToValue(filtered) as { [s: string]: unknown }).forEach(
          ([k, v]) => (body[k] = v),
        );
      }
    }

    callApi(finalUrl, op.method, headers, Object.keys(body).length > 0 ? JSON.stringify(body) : undefined)
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

export const callApi = async (
  url: string,
  method: string,
  headers: HeadersInit,
  body?: BodyInit,
): Promise<
  | {
      status: null;
      body: { error: string };
    }
  | {
      status: number;
      body: object;
    }
> => {
  try {
    const response = await fetch(url, {
      method,
      body,
      headers,
    });
    const responseBody = await response.json();
    return {
      status: response.status,
      body: responseBody,
    };
  } catch {
    return {
      status: null,
      body: { error: 'Something went wrong. Please try again later.' },
    };
  }
};
