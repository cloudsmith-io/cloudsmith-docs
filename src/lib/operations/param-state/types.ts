export type PathParamState = Record<string, StringParamState>;

export type QueryParamState = Record<string, SimpleParamState>;

export type BodyParamState = Record<string, ParamState>;
export type ParamState = SimpleParamState | ComposedParamState;

export type StringParamState = {
  type: 'string';
  name?: string;
  value: string;
};
export type BooleanParamState = {
  type: 'boolean';
  name?: string;
  value: boolean | null;
};
export type NumberParamState = {
  type: 'number';
  name?: string;
  value: number | null;
};
export type IntegerParamState = {
  type: 'integer';
  name?: string;
  value: number | null;
};
export type SimpleParamState = StringParamState | BooleanParamState | NumberParamState | IntegerParamState;

export type ArrayParamState = {
  type: 'array';
  name?: string;
  items: {
    [id: string]: ParamState;
  };
};
export type ObjectParamState = {
  type: 'object';
  name?: string;
  items: {
    [id: string]: ParamState;
  };
};
export type ComposedParamState = ArrayParamState | ObjectParamState;
