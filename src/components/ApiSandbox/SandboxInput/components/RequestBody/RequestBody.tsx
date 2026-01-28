import { useEffect, useMemo, useState } from 'react';

import { Flex } from '@/components/Flex';
import { Tag } from '@/components/Tag';
import { ApiOperation, SchemaObject } from '@/lib/swagger/types';

import ParamSet from '../ParamSet';
import { ParamToggle } from '../ParamSet/ParamSet';
import styles from './RequestBody.module.css';

export const RequestBody = ({ requestBody }: { requestBody: NonNullable<ApiOperation['requestBody']> }) => {
  const [showAll, setShowAll] = useState(false);

  const parameterEntries = useMemo(
    () =>
      Object.entries(requestBody.content)
        .map((entry) => {
          const content = entry[1];
          const properties = { ...content.schema?.properties };
          if (content.schema?.required?.length) {
            for (const s of content.schema?.required) {
              properties[s].required = [s];
            }
          }
          return properties;
        })
        .filter((v) => !!v)
        .flatMap((p) => Object.entries(p)),
    [requestBody],
  );

  useEffect(() => {
    setShowAll(false);
  }, [parameterEntries]);

  const optionalExists = useMemo(
    () => parameterEntries.some((p) => p[1].required == null || !p[1].required),
    [parameterEntries],
  );
  const displayedParameters = useMemo(() => {
    return parameterEntries.filter((param) => showAll || param[1].required);
  }, [parameterEntries, showAll]);

  return (
    <ParamSet heading="Body params">
      {displayedParameters.map((p) => {
        const [name, param] = p as unknown as [string, SchemaObject];
        return (
          <Flex key={name} className={styles.param} justify="between" align="center" wrap={false}>
            <Flex className={styles.name} gap="2xs" wrap align="center">
              <div className={styles.nameName}>{name}</div>
              <div className={styles.paramType}>{param?.type}</div>
              <div>
                <Tag variant={param.required ? 'tomato' : 'grey'}>
                  {param.required ? 'required' : 'optional'}
                </Tag>
              </div>
            </Flex>
          </Flex>
        );
      })}
      {optionalExists && <ParamToggle paramTag="body params" show={showAll} onChangeShow={setShowAll} />}
    </ParamSet>
  );
};

export default RequestBody;
