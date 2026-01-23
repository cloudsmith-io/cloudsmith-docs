import { cx } from 'class-variance-authority';

import { Flex } from '@/components/Flex';
import { Tag } from '@/components/Tag';
import { ApiOperation, SchemaObject } from '@/lib/swagger/types';

import styles from './RequestBody.module.css';

export const RequestBody = ({ requestBody }: { requestBody: NonNullable<ApiOperation['requestBody']> }) => (
  <div className={styles.root}>
    <div className={styles.header}>
      <div className={cx(styles.heading, 'monoXSUppercase')}>Body params</div>
    </div>
    {requestBody.content &&
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
        .flatMap((p) => Object.entries(p))
        .flatMap((p) => {
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
  </div>
);

export default RequestBody;
