import { ApiOperation } from '@/lib/swagger/types';

import { defaultMedia } from '../constants';
import { BodyParamState, ObjectParamState, PathParamState, QueryParamState } from '../param-state/types';
import {
  defaultBoolean,
  defaultNumber,
  defaultString,
  paramStateIsNullish,
  paramStateToValue,
} from '../param-state/util';
import { operationParametersByType, operationUrl } from '../util';
import { ApiCallTestResponse } from './type';

export const callApi = async (
  url: string,
  method: string,
  headers: HeadersInit,
  body?: BodyInit,
): Promise<ApiCallTestResponse> => {
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

export const resolveApiRequestUrl = ({
  operation,
  path,
  query,
}: {
  operation: ApiOperation;
  path: PathParamState;
  query: QueryParamState;
}) => {
  const baseUrl = operationUrl(operation);

  const pathReplacedUrl = Object.entries(path).reduce((url, current) => {
    const [param, state] = current;
    const value = state.value;
    const template = `{${param}}`;
    if (value !== '' && url.includes(template)) {
      return url.replaceAll(template, value);
    }
    return url;
  }, baseUrl);

  const cleanedUrl = pathReplacedUrl.replaceAll('\{', '').replaceAll('\}', '');

  const queryParams = operationParametersByType(operation, 'query') ?? [];

  const finalUrl = Object.entries(query)
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

  return finalUrl;
};

export const resolveApiRequestHeaders = ({
  media,
  authType,
  authValue,
}: {
  media: string;
  authType: 'apikey' | 'basic' | null;
  authValue: string | null;
}): HeadersInit => {
  const headers: HeadersInit = {
    accept: 'application/json',
    'content-type': media,
  };

  if (authType && authValue) {
    const key = authType === 'apikey' ? 'X-Api-Key' : 'authorization';
    const value = authType === 'apikey' ? authValue : `Basic ${btoa(authValue)}`;
    headers[key] = value;
  }

  return headers;
};

export const resolveApiRequestBody = ({
  body,
  media,
}: {
  body: BodyParamState;
  media: string;
}): { body: Record<string, unknown>; count: number } => {
  const bodyRecord: Record<string, unknown> = {};
  if (body && media === defaultMedia && body[media]) {
    const bodyParams = body[media] as ObjectParamState;

    const filtered: ObjectParamState = {
      ...bodyParams,
      items: Object.fromEntries(
        Object.entries(bodyParams.items).filter((entry) => !paramStateIsNullish(entry[1])),
      ),
    };

    if (Object.keys(filtered.items).length > 0) {
      Object.entries(paramStateToValue(filtered) as { [s: string]: unknown }).forEach(
        ([k, v]) => (bodyRecord[k] = v),
      );
    }
  }

  return { body: bodyRecord, count: Object.keys(bodyRecord).length };
};
