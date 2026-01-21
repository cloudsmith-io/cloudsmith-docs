import { cx } from 'class-variance-authority';

import { Flex } from '@/components/Flex';
import { Tag } from '@/components/Tag';
import { ApiOperation, SchemaObject } from '@/lib/swagger/types';

import styles from './RequestBody.module.css';

export const RequestBody = ({ requestBody }: { requestBody: NonNullable<ApiOperation['requestBody']> }) => (
  <div className={styles.grid}>
    <div className={cx(styles.item, styles.header)}>
      <div className={cx(styles.subItem, 'monoXSUppercase')}>
        Body params{' '}
        {requestBody.required && (
          <Tag variant={requestBody.required ? 'red' : 'grey'}>
            {requestBody.required ? 'required' : 'optional'}
          </Tag>
        )}
      </div>
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
            <div key={name} className={styles.item}>
              <Flex className={styles.param}>
                <div>{name}</div>
                <div className={styles.subItemType}>{param?.type}</div>
                <div>
                  <Tag variant={param?.required ? 'red' : 'grey'}>
                    {param?.required ? 'required' : 'optional'}
                  </Tag>
                </div>
              </Flex>
            </div>
          );
        })}
  </div>
);

export default RequestBody;
