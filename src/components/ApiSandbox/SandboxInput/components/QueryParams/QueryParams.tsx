import { useEffect, useMemo, useState } from 'react';

import { useParameters } from '@/components/ApiSandbox/context/hook';
import { NonArraySchemaObject } from '@/lib/swagger/types';

import RootParamSet, { ParamEntry } from '../ParamSet';
import { ParamToggle } from '../ParamSet/ParamSet';

const QueryParams = () => {
  const { queryParameters: parameters, queryParamState, updateQueryParam } = useParameters();

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

  return parameters.length > 0 ? (
    <RootParamSet heading="Query params">
      {requiredParameters.map((param) => (
        <ParamEntry
          key={param.name}
          name={param.name}
          description={param.description}
          schema={param.schema as NonArraySchemaObject}
          required={param.required}
          value={queryParamState[param.name]}
          onValueChange={(v) => updateQueryParam(param.name, v)}
        />
      ))}
      {optionalExists && (
        <ParamToggle
          paramTag={`optional (${optionalParameters.length})`}
          show={showAll}
          onChangeShow={setShowAll}
        />
      )}
      {showAll &&
        optionalParameters.map((param) => (
          <ParamEntry
            key={param.name}
            name={param.name}
            description={param.description}
            schema={param.schema as NonArraySchemaObject}
            required={param.required}
            value={queryParamState[param.name]}
            onValueChange={(v) => updateQueryParam(param.name, v)}
          />
        ))}
    </RootParamSet>
  ) : null;
};

export default QueryParams;
