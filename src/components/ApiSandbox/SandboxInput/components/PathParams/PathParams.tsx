import { useParameters } from '@/components/ApiSandbox/context/hook';
import { StringParamState } from '@/lib/operations/param-state/types';
import { NonArraySchemaObject } from '@/lib/swagger/types';

import RootParamSet, { ParamEntry } from '../ParamSet';

const PathParams = () => {
  const { pathParamState, pathParameters, updatePathParam } = useParameters();

  return pathParameters.length > 0 ? (
    <RootParamSet heading="Path params">
      {pathParameters.map((param) => (
        <ParamEntry
          key={param.name}
          name={param.name}
          schema={param.schema as NonArraySchemaObject}
          required={param.required}
          value={pathParamState[param.name]}
          onValueChange={(v) => updatePathParam(param.name, v as StringParamState)}
        />
      ))}
    </RootParamSet>
  ) : null;
};

export default PathParams;
