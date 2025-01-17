'use client';

import { Tag } from '@/components';
import { ApiOperation } from '@/lib/swagger/types';
import { cx } from 'class-variance-authority';
import { OpenAPIV3 } from 'openapi-types';
import { RequiredTag } from '../_common/RequireTag';

import styles from './Request.module.css';

export const Request = (operation: ApiOperation) => {
  return (
    <>
      <div className={styles.request}>
        <div className={styles.url}>
          <Tag method={operation.method} />
          {`${process.env.NEXT_PUBLIC_CLOUDSMITH_API_URL}${operation.path}`}
        </div>
      </div>

      <PathParams {...operation} />
      <QueryParams {...operation} />
    </>
  );
};

const PathParams = (operation: ApiOperation) => {
  const operations = (operation.parameters as OpenAPIV3.ParameterObject[])?.filter(
    (param) => param.in === 'path',
  );

  if (operations.length) {
    return (
      <div className={styles.grid}>
        <div className={cx(styles.item, styles.header)}>
          <div className={styles.subItem}>Path params</div>
        </div>

        {operations.map((param) => (
          <div key={param.name} className={styles.item}>
            <div className={styles.subItem}>{param.name}</div>
            <div className={cx(styles.subItem, styles.subItemType)}>
              {(param.schema as OpenAPIV3.SchemaObject).type}
            </div>
            <div className={styles.subItem}>
              <RequiredTag isRequired={param.required} />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return null;
};

const QueryParams = (operation: ApiOperation) => {
  const operations = operation.parameters?.filter((param) => param.in === 'query');

  if (operations?.length) {
    return (
      <div className={styles.grid}>
        <div className={cx(styles.item, styles.header)}>
          <div className={styles.subItem}>Query params</div>
        </div>

        {operations.map((param) => (
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
  }

  return null;
};
