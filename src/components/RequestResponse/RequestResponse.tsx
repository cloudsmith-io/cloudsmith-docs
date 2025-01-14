import { ChevronIcon } from '@/icons/Chevron';
import { ApiOperation } from '@/lib/swagger/types';
import { Heading, Paragraph } from '@/markdown';
import { cx } from 'class-variance-authority';
import { OpenAPIV3 } from 'openapi-types';
import React from 'react';
import { Tag } from '../Tag';

import styles from './RequestResponse.module.css';

export const RequestResponse = (operation: PropsRequestResponseProps) => {
  return (
    <>
      {/* TODO: Use headline from where? */}
      <Heading size="h1">Headline</Heading>

      <Paragraph>{operation.description}</Paragraph>

      <div className={styles.root}>
        <Heading size="h2" className={styles.fullWidth}>
          Request
        </Heading>

        <div className={styles.request}>
          <div className={styles.url}>
            <Tag method={operation.method} />
            {`${process.env.NEXT_PUBLIC_CLOUDSMITH_API_URL}${operation.path}`}
          </div>
        </div>

        <PathParams {...operation} />
        <QueryParams {...operation} />

        <Heading size="h2">Response</Heading>

        <Responses {...operation} />
      </div>
    </>
  );
};

const PathParams = (operation: PropsRequestResponseProps) => {
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
              <Tag variant={param.required ? 'red' : 'grey'}>{param.required ? 'required' : 'optional'}</Tag>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return null;
};

const QueryParams = (operation: PropsRequestResponseProps) => {
  const operations = (operation.parameters as OpenAPIV3.ParameterObject[])?.filter(
    (param) => param.in === 'query',
  );

  if (operations.length) {
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

const Responses = (operation: PropsRequestResponseProps) => {
  const responses = operation.responses as { [code: string]: OpenAPIV3.ResponseObject };

  return (
    <div className={styles.grid}>
      <div className={cx(styles.item, styles.header)}>
        <div className={styles.subItem}>Responses</div>
      </div>

      {Object.entries(responses).map(([code, response]) => (
        <React.Fragment key={code}>
          <button type="button" className={cx(styles.item, styles.itemToggler)}>
            <div className={styles.subItem}>
              <Tag statusCode={Number(code) as Tag.HttpResponseStatusCodes} />
              <ChevronIcon
                title=""
                chevronDirection="right"
                transition={{ duration: 0.35, ease: [0.55, 0, 0, 1] }}
                className={styles.togglerIcon}
              />
            </div>
            <div className={cx(styles.subItem, styles.subItemDescriptionWide)}>
              Temporary description
              {response.description}
            </div>
          </button>
          <div className={cx(styles.item, styles.itemContent)}>
            <div className={styles.itemContentInner}>Response body</div>
          </div>
        </React.Fragment>
      ))}
    </div>
  );
};

type PropsRequestResponseProps = ApiOperation;
