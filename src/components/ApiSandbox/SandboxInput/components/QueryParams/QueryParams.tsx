import { useEffect, useMemo, useState } from 'react';

import { ApiOperation, NonArraySchemaObjectType } from '@/lib/swagger/types';

import ParamSet, { Param } from '../ParamSet';
import { ParamToggle } from '../ParamSet/ParamSet';

type QueryParamsProps = {
  parameters: NonNullable<ApiOperation['parameters']>;
  state: Record<string, string>;
  onUpdateParam: (name: string, value: string) => void;
};

const QueryParams = ({ parameters, state, onUpdateParam }: QueryParamsProps) => {
  const [showAll, setShowAll] = useState(false);
  useEffect(() => {
    setShowAll(false);
  }, [parameters]);
  const optionalExists = useMemo(
    () => parameters.some((p) => p.required == null || !p.required),
    [parameters],
  );
  const displayedParameters = useMemo(() => {
    return parameters.filter((param) => showAll || param.required);
  }, [parameters, showAll]);
  return (
    <ParamSet heading="Query params">
      {displayedParameters.map((param) => (
        <Param
          key={param.name}
          name={param.name}
          description={param.description}
          // TODO: extend
          type={(param.schema?.type ?? 'string') as NonArraySchemaObjectType}
          required={param.required}
          value={state[param.name]}
          onValueChange={(v) => onUpdateParam(param.name, v)}
        />
      ))}
      {optionalExists && <ParamToggle paramTag="query params" show={showAll} onChangeShow={setShowAll} />}
    </ParamSet>
  );
};

export default QueryParams;
