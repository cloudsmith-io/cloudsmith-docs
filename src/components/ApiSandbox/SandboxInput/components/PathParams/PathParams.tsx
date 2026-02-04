import { PathParamState, StringParamState } from '@/lib/operations/types';
import { ApiOperation, NonArraySchemaObject } from '@/lib/swagger/types';

import RootParamSet, { ParamEntry } from '../ParamSet';

type PathParamsProps = {
  parameters: NonNullable<ApiOperation['parameters']>;
  state: PathParamState;
  onUpdateParam: (name: string, value: StringParamState) => void;
};

const PathParams = ({ parameters, state, onUpdateParam }: PathParamsProps) => (
  <RootParamSet heading="Path params">
    {parameters.map((param) => (
      <ParamEntry
        key={param.name}
        name={param.name}
        schema={param.schema as NonArraySchemaObject}
        required={param.required}
        value={state[param.name]}
        onValueChange={(v) => onUpdateParam(param.name, v as StringParamState)}
      />
    ))}
  </RootParamSet>
);

export default PathParams;
