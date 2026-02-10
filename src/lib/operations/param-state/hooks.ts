import { useCallback, useEffect, useState } from 'react';

import { ParameterObject } from '@/lib/swagger/types';

import { PathParamState, StringParamState } from './types';
import { defaultPathParamState } from './util';

const PATH_PARAM_LOCAL_STORAGE_KEY = 'path-params';

const PATH_PARAMS_SYNONYMS = [
  ['owner', 'org', 'workspace'],
  ['package_format'],
  ['repo'],
  ['package_name'],
  ['member'],
  ['team'],
  ['package_version'],
  ['package_identifiers'],
  ['policy_slug_perm'],
  ['claim_value'],
  ['service'],
  ['package'],
  ['package_slug_perm'],
  ['policy'],
  ['action'],
];

const PATH_PARAMS_TO_PERSIST = PATH_PARAMS_SYNONYMS.flat();

const getPersistedPathParams = () =>
  JSON.parse(localStorage.getItem(PATH_PARAM_LOCAL_STORAGE_KEY) ?? '{}') as PathParamState;

export const usePathParamsState = (parameters: ParameterObject[]) => {
  const [pathParamState, setPathParamState] = useState<PathParamState>({});

  useEffect(() => {
    const persistedValues = getPersistedPathParams();
    const filteredPersisted = Object.fromEntries(
      Object.entries(persistedValues).filter((p) => PATH_PARAMS_TO_PERSIST.includes(p[0])),
    );
    const fallback = defaultPathParamState(parameters);

    const values = {
      ...fallback,
      ...filteredPersisted,
    };
    const names = parameters.map((p) => p.name);
    const filteredValues = Object.fromEntries(Object.entries(values).filter((p) => names.includes(p[0])));

    setPathParamState(filteredValues);
  }, [parameters]);

  const updatePathParam = useCallback(
    (name: string, value: StringParamState) => {
      setPathParamState((v) => {
        return { ...v, [name]: value };
      });
    },
    [setPathParamState],
  );

  useEffect(() => {
    const persistedValues = getPersistedPathParams();
    const values = {
      ...persistedValues,
      ...pathParamState,
    };
    const filteredValues = Object.fromEntries(
      Object.entries(values).filter((p) => PATH_PARAMS_TO_PERSIST.includes(p[0])),
    );
    const synonyms = Object.fromEntries(
      PATH_PARAMS_TO_PERSIST.flatMap((p) => {
        const group = PATH_PARAMS_SYNONYMS.find((g) => g.includes(p))!;
        const entry = Object.entries(pathParamState).find((e) => group.includes(e[0]));
        if (!entry) return [];
        return group.filter((p) => p !== entry[0]).map((p) => [p, entry[1]]);
      }),
    );

    localStorage.setItem(PATH_PARAM_LOCAL_STORAGE_KEY, JSON.stringify({ ...filteredValues, ...synonyms }));
  }, [pathParamState]);

  return { pathParamState, updatePathParam };
};
