import { cx } from 'class-variance-authority';
import { ApiOperation } from '@/lib/swagger/types';

import styles from './RequestResponse.module.css';
import { Heading } from '@/markdown';
import { Method } from '../Method';

export const RequestResponse = (operation: PropsRequestResponseProps) => {
  return (
    <div className={styles.root}>
      <Heading size="h2">Request</Heading>

      <Method method="get" />
      <Method method="get" size="medium" type="package" />

      <Method variant="green" type="status" size="medium">
        get
      </Method>

      <div className={styles.request}>
        <div className={styles.url}>
          <Method method={operation.method} type="status" size="medium" />
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
                  {typeof param.schema === 'object' ? param.schema.type : param.schema}
                </div>
                <div className={styles.subItem}>
                  <Method variant={param.required ? 'red' : 'grey'} type="status" size="medium">
                    {param.required ? 'required' : 'optional'}
                  </Method>
                </div>
              </div>
            ))}
          <div className={styles.item}>
            <div className={styles.subItem}>owner</div>
            <div className={styles.subItem}>string</div>
            <div className={styles.subItem}>required</div>
          </div>
          <div className={styles.item}>
            <div className={styles.subItem}>owner</div>
            <div className={styles.subItem}>string</div>
            <div className={styles.subItem}>required</div>
          </div>
        </div>
      </div>

      <Heading size="h2">Response</Heading>
    </div>
  );
};

interface PropsRequestResponseProps extends ApiOperation {}
