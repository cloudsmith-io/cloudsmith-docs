import { cx } from 'class-variance-authority';
import { ApiOperation } from '@/lib/swagger/types';

import styles from './RequestResponse.module.css';
import { Heading } from '@/markdown';
import { Method } from '../Method';

export const RequestResponse = (operation: PropsRequestResponseProps) => {
  return (
    <div className={styles.root}>
      <Heading size="h2">Request</Heading>
      <div className={styles.request}>
        <div className={styles.url}>
          <Method type={operation.method} size="medium">
            {operation.method}
          </Method>
          {`${process.env.NEXT_PUBLIC_CLOUDSMITH_API_URL}${operation.path}`}
        </div>

        <div className={styles.grid}>
          <div className={cx(styles.item, styles.header)}>
            <div className={styles.subItem}>Path params</div>
          </div>
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
