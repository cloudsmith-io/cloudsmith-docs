import { cx } from 'class-variance-authority';
import { ApiOperation } from '@/lib/swagger/types';

import styles from './RequestResponse.module.css';
import { Heading } from '@/markdown';
import { Tag } from '../Tag';

export const RequestResponse = (operation: PropsRequestResponseProps) => {
  return (
    <div className={styles.root}>
      <Heading size="h2">Request</Heading>

      <div className={styles.request}>
        <div className={styles.url}>
          <Tag method={operation.method} />
          {`${process.env.NEXT_PUBLIC_CLOUDSMITH_API_URL}${operation.path}`}
        </div>

        <div className={styles.grid}>
          <div className={cx(styles.item, styles.header)}>
            <div className={styles.subItem}>Path params</div>
          </div>

          {operation.parameters
            // Only get path parameters
            ?.filter((param) => 'in' in param)
            .map((param) => (
              <div key={param.name} className={styles.item}>
                <div className={styles.subItem}>{param.name}</div>
                <div className={styles.subItem}>
                  {/* @ts-ignore */}
                  {param.schema && typeof param.schema === 'string' ? param.schema : param.schema?.type}
                </div>
                <div className={styles.subItem}>
                  <Tag variant={param.required ? 'red' : 'grey'}>
                    {param.required ? 'required' : 'optional'}
                  </Tag>
                </div>
              </div>
            ))}
        </div>
      </div>

      <Heading size="h2">Response</Heading>
    </div>
  );
};

interface PropsRequestResponseProps extends ApiOperation {}
