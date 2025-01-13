import { cx } from 'class-variance-authority';
import { ApiOperation } from '@/lib/swagger/types';

import styles from './RequestResponse.module.css';
import { Heading } from '@/markdown';
import { Tag } from '../Tag';
import { OpenAPIV3 } from 'openapi-types';

export const RequestResponse = (operation: PropsRequestResponseProps) => {
  return (
    <div className={styles.root}>
      <Heading size="h2">Request</Heading>

      <div className={styles.request}>
        <div className={styles.url}>
          <Tag method={operation.method} />
          {`${process.env.NEXT_PUBLIC_CLOUDSMITH_API_URL}${operation.path}`}
        </div>
      </div>

      <PathParams {...operation} />
      <QueryParams {...operation} />

      <Heading size="h2">Response</Heading>
    </div>
  );
};

const PathParams = (operation: PropsRequestResponseProps) => {
  return (
    <div className={styles.grid}>
      <div className={cx(styles.item, styles.header)}>
        <div className={styles.subItem}>Path params</div>
      </div>

      {(operation.parameters as OpenAPIV3.ParameterObject[])
        // Only get path parameters
        ?.filter((param) => param.in === 'path')
        .map((param) => (
          <div key={param.name} className={styles.item}>
            <div className={styles.subItem}>{param.name}</div>
            <div className={styles.subItem}>
              {param.schema && typeof param.schema === 'string' ? param.schema : param.schema?.type}
            </div>
            <div className={styles.subItem}>
              <Tag variant={param.required ? 'red' : 'grey'}>{param.required ? 'required' : 'optional'}</Tag>
            </div>
          </div>
        ))}
    </div>
  );
};

const QueryParams = (operation: PropsRequestResponseProps) => {
  return (
    <div className={styles.grid}>
      <div className={cx(styles.item, styles.header)}>
        <div className={styles.subItem}>Query params</div>
      </div>

      {(operation.parameters as OpenAPIV3.ParameterObject[])
        // Only get path parameters
        ?.filter((param) => param.in === 'query')
        .map((param) => (
          <div key={param.name} className={styles.item}>
            <div className={styles.subItem}>{param.name}</div>
            <div className={cx(styles.subItem, styles.subItemType)}>
              {(param.schema as OpenAPIV3.SchemaObject).type}
            </div>
            <div className={cx(styles.subItem, styles.subItemDescription)}>{param.description}</div>
          </div>
        ))}
    </div>
  );
};

type PropsRequestResponseProps = ApiOperation;
