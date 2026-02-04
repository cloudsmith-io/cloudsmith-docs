import { ApiOperation, ParameterObject, RequestBodyObject, SchemaObject } from '../swagger/types';
import { defaultMedia } from './constants';
import { BodyParamState, ObjectParamState, ParamState, PathParamState, QueryParamState } from './types';

export const operationUrl = (operation: ApiOperation) =>
  `${process.env.NEXT_PUBLIC_CLOUDSMITH_API_URL}/${operation.version}${operation.path}/`;

/**
 * Turns an operation slug into a fully qualified local path to use in links
 */
export const operationPath = (slug: string): string => {
  return `/api/${slug}`;
};

export const getParametersByParam = (operation: ApiOperation, param: string) =>
  operation.parameters?.filter((p) => p.in === param);

export const getAuthOptions = (operation: ApiOperation) =>
  Array.from(
    new Set(
      (operation.security ?? [])
        .flatMap((s) => Object.keys(s))
        .filter((s) => s === 'apikey' || s === 'basic'),
    ),
  ).toSorted();

export const operationKey = (op: ApiOperation) => `${op.method}-${op.path}`;

export const randomId = (): string => `--${Math.random()}`;

export const valueToParamState = (
  value: string | number | boolean | unknown[] | object,
  name?: string,
): ParamState => {
  if (typeof value === 'string')
    return {
      type: 'string',
      value,
      name,
    };
  if (typeof value === 'number')
    return {
      type: 'number',
      value,
      name,
    };
  if (typeof value === 'boolean')
    return {
      type: 'boolean',
      value,
      name,
    };
  if (Array.isArray(value))
    return {
      type: 'array',
      name,
      items: Object.fromEntries(value.map((v) => [randomId(), valueToParamState(v)])),
    };

  return {
    type: 'object',
    name,
    items: Object.fromEntries(Object.entries(value).map(([k, v]) => [randomId(), valueToParamState(v, k)])),
  };
};

export const paramStateToValue = (state: ParamState): unknown => {
  if (state.type === 'string') return state.value;
  if (state.type === 'number') return state.value;
  if (state.type === 'integer') return state.value;
  if (state.type === 'boolean') return state.value;
  if (state.type === 'array') return Object.values(state.items).map((s) => paramStateToValue(s));
  if (state.type === 'object')
    return Object.fromEntries(
      Object.entries(state.items).map((entry) => [entry[1].name, paramStateToValue(entry[1])]),
    );
};

export const paramStateIsNullish = (state: ParamState): boolean => {
  if (state.type === 'string') return state.value === '';
  if (state.type === 'number') return state.value === null;
  if (state.type === 'integer') return state.value === null;
  if (state.type === 'boolean') return state.value === null;
  if (state.type === 'array') return Object.values(state.items).length === 0;
  if (state.type === 'object') return Object.values(state.items).length === 0;

  return false;
};

export const defaultString = (declaredDefault: string) => (declaredDefault != null ? declaredDefault : '');
export const defaultNumber = (declaredDefault: number) => (declaredDefault != null ? declaredDefault : null);
export const defaultBoolean = (declaredDefault: boolean) =>
  declaredDefault != null ? declaredDefault : null;
export const defaultArray = (declaredDefault: unknown[]) => (declaredDefault != null ? declaredDefault : []);

export const defaultPathParamState = (params: ParameterObject[]): PathParamState =>
  Object.fromEntries(
    params.map((p) => [
      p.name,
      {
        type: 'string',
        name: p.name,
        value: '',
      },
    ]),
  );

export const defaultQueryParamState = (params: ParameterObject[]): QueryParamState =>
  Object.fromEntries(
    params
      .filter((p) => ['string', 'boolean', 'number', 'integer'].includes(p.schema?.type ?? ''))
      .map((p) => {
        if (p.schema?.type === 'boolean')
          return [
            p.name,
            {
              type: p.schema?.type,
              name: p.name,
              value: defaultBoolean(p.schema?.default),
            },
          ];
        if (p.schema?.type === 'integer')
          return [
            p.name,
            {
              type: 'integer',
              name: p.name,
              value: defaultNumber(p.schema?.default),
            },
          ];
        if (p.schema?.type === 'number')
          return [
            p.name,
            {
              type: p.schema?.type,
              name: p.name,
              value: defaultNumber(p.schema?.default),
            },
          ];
        return [
          p.name,
          {
            type: p.schema?.type,
            name: p.name,
            value: defaultString(p.schema?.default),
          },
        ];
      }),
  );

export const defaultParamState = (schema: SchemaObject, name?: string): ParamState => {
  if (schema.type === 'string')
    return {
      type: 'string',
      name,
      value: defaultString(schema?.default),
    };
  if (schema.type === 'boolean')
    return {
      type: 'boolean',
      name,
      value: defaultBoolean(schema?.default),
    };
  if (schema.type === 'integer')
    return {
      type: 'integer',
      name,
      value: defaultNumber(schema?.default),
    };
  if (schema.type === 'number')
    return {
      type: 'number',
      name,
      value: defaultNumber(schema?.default),
    };

  if (schema.type === 'array') {
    return {
      type: 'array',
      name,
      items: {},
    };
  }

  return {
    type: 'object',
    name,
    items: Object.fromEntries(
      Object.entries(schema.properties ?? {}).map(([name, sch]) => [
        randomId(),
        defaultParamState(sch, name),
      ]),
    ),
  };
};

export const defaultBodyParamState = (bodyParameters: RequestBodyObject | undefined): BodyParamState => {
  return Object.fromEntries(
    Object.entries(bodyParameters?.content ?? {}).map(([media, definition]) => [
      media,
      defaultParamState(definition.schema ?? {}),
    ]),
  );
};

export const curlCommand = (
  op: ApiOperation,
  paramState: {
    path: PathParamState;
    query: QueryParamState;
    body: BodyParamState;
  },
  auth: ['apikey' | 'basic' | null, string | null, boolean],
  media: string = defaultMedia,
) => {
  let command = `curl --request ${op.method.toUpperCase()} \\\n`;

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

  command += `     --url '${finalUrl}' \\\n`;

  const [authKey, authValue, hiddenAuth] = auth;

  if (authKey && authValue && (authKey !== 'basic' || authValue != ':')) {
    const headerStart = authKey === 'apikey' ? 'X-Api-Key: ' : 'authorization: Basic ';
    const headerEnd = hiddenAuth ? '*****************' : authKey === 'apikey' ? authValue : btoa(authValue);
    command += `     --header '${headerStart}${headerEnd}' \\\n`;
  }

  command += `     --header 'accept:application/json' \\\n`;
  command += `     --header 'content-type: ${media}' `;

  if (paramState.body && media === defaultMedia && paramState.body[media]) {
    const bodyParams = paramState.body[media] as ObjectParamState;

    const filtered: ObjectParamState = {
      ...bodyParams,
      items: Object.fromEntries(
        Object.entries(bodyParams.items).filter((entry) => !paramStateIsNullish(entry[1])),
      ),
    };

    if (Object.keys(filtered.items).length > 0) {
      command += `\\\n`;
      command += `     --data '\n`;
      command += JSON.stringify(paramStateToValue(filtered), null, 4);
      command += `\n'`;
    }
  }

  return command;
};

/*
  Based on:
  https://spec.openapis.org/oas/v3.0.3.html#properties
  https://datatracker.ietf.org/doc/html/draft-wright-json-schema-validation-00#section-5
*/
export const textualSchemaRules = (schema: SchemaObject) =>
  Object.entries(schema).reduce<string[]>((acc, [key, value]) => {
    if (!value) {
      return acc;
    }

    switch (key) {
      // Validation keywords for numeric instances
      case 'multipleOf':
        acc.push(`multiple of ${value}`);
        break;
      case 'maximum':
        if (!schema.minimum) {
          acc.push(`length ≤ ${value}${schema.exclusiveMaximum ? ' (exclusive)' : ''}`);
        }
        break;
      case 'minimum':
        if (!schema.maximum) {
          acc.push(`length ≥ ${value}${schema.exclusiveMinimum ? ' (exclusive)' : ''}`);
        }
        if (schema.maximum) {
          acc.push(`length between ${value} and ${schema.maximum}`);
        }
        break;

      // Validation keywords for strings
      case 'maxLength':
        if (!schema.minLength) {
          acc.push(`length ≤ ${value}`);
        }
        break;
      case 'minLength':
        if (!schema.maxLength) {
          acc.push(`length ≥ ${value}`);
        }
        if (schema.maxLength) {
          acc.push(`length between ${value} and ${schema.maxLength}`);
        }
        break;
      case 'pattern':
        acc.push(`${value}`);
        break;

      // Validation keywords for arrays
      case 'additionalItems':
        if (value === false) {
          acc.push('No additional items allowed');
        }
        break;
      case 'maxItems':
        if (!schema.minItems) {
          acc.push(`items ≤ ${value}`);
        }
        break;
      case 'minItems':
        if (!schema.maxItems) {
          acc.push(`items ≥ ${value}`);
        }
        if (schema.maxItems) {
          const uniqueText = schema.uniqueItems ? ' (unique)' : '';
          acc.push(`items between ${value} and ${schema.maxItems}${uniqueText}`);
        }
        break;
      case 'uniqueItems':
        if (value === true && !schema.minItems && !schema.maxItems) {
          acc.push('Items must be unique');
        }
        break;

      // Validation keywords for objects
      case 'maxProperties':
        acc.push(`length ≤ ${value}`);
        break;
      case 'minProperties':
        acc.push(`length ≥ ${value}`);
        break;
      case 'additionalProperties':
        if (value === false) {
          acc.push('no additional properties allowed');
        }
        break;

      // Validation keywords for any instance type
      case 'enum':
        acc.push(`Allowed values: ${value.join(', ')}`);
        break;
      case 'format':
        // TODO: Decide what to do with format
        // acc.push(`${value}`);
        break;
      case 'default':
        acc.push(`Defaults to ${value}`);
        break;

      // TODO: What should we render here?
      case 'allOf':
        acc.push('Must match all schemas');
        break;
      case 'anyOf':
        acc.push('Must match any schema');
        break;
      case 'oneOf':
        acc.push('Must match exactly one schema');
        break;
      case 'not':
        acc.push('Must not match schema');
        break;
    }
    return acc;
  }, []);
