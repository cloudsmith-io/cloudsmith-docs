import { ParameterObject, RequestBodyObject, SchemaObject } from '@/lib/swagger/types';

import { BodyParamState, ParamState, PathParamState, QueryParamState } from './types';

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
