import { useEffect, useMemo, useState } from 'react';

import { QueryParamState, SimpleParamState } from '@/lib/operations/types';
import { ApiOperation, NonArraySchemaObject } from '@/lib/swagger/types';

import RootParamSet, { ParamEntry } from '../ParamSet';
import { ParamToggle } from '../ParamSet/ParamSet';

type QueryParamsProps = {
  parameters: NonNullable<ApiOperation['parameters']>;
  state: QueryParamState;
  onUpdateParam: (name: string, value: SimpleParamState) => void;
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

  const sortedParameterEntries = useMemo(() => {
    return parameters.toSorted((a, b) => a.name.localeCompare(b.name));
  }, [parameters]);

  const requiredParameters = useMemo(
    () => sortedParameterEntries.filter((p) => p.required),
    [sortedParameterEntries],
  );
  const optionalParameters = useMemo(
    () => sortedParameterEntries.filter((p) => !p.required == null || !p.required),
    [sortedParameterEntries],
  );
  const displayedParameters = useMemo(() => {
    if (showAll) return [...requiredParameters, ...optionalParameters];
    return requiredParameters;
  }, [requiredParameters, showAll, optionalParameters]);

  return (
    <RootParamSet heading="Query params">
      {displayedParameters.map((param) => (
        <ParamEntry
          key={param.name}
          name={param.name}
          description={param.description}
          schema={param.schema as NonArraySchemaObject}
          required={param.required}
          value={state[param.name]}
          onValueChange={(v) => onUpdateParam(param.name, v)}
        />
      ))}
      {optionalExists && (
        <ParamToggle
          paramTag={`optional query params (${optionalParameters.length})`}
          show={showAll}
          onChangeShow={setShowAll}
        />
      )}
    </RootParamSet>
  );
};

export default QueryParams;
