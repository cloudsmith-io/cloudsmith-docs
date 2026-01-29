import { ApiOperation } from '@/lib/swagger/types';

import ParamSet, { Param } from '../ParamSet';

type PathParamsProps = {
  parameters: NonNullable<ApiOperation['parameters']>;
  state: Record<string, string>;
  onUpdateParam: (name: string, value: string) => void;
};

const PathParams = ({ parameters, state, onUpdateParam }: PathParamsProps) => (
  <ParamSet heading="Path params">
    {parameters.map((param) => (
      <Param
        key={param.name}
        name={param.name}
        schema={param.schema}
        required={param.required}
        value={state[param.name]}
        onValueChange={(v) => onUpdateParam(param.name, v)}
      />
    ))}
  </ParamSet>
);

export default PathParams;
