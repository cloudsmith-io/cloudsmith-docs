'use client';

import { ChevronIcon } from '@/icons/Chevron';
import { ApiOperation } from '@/lib/swagger/types';
import { Heading, Paragraph } from '@/markdown';
import { cx } from 'class-variance-authority';
import { Transition } from 'motion/dist/react';
import * as m from 'motion/react-m';
import { OpenAPIV3 } from 'openapi-types';
import { useState } from 'react';
import { Tag } from '../Tag';

import styles from './RequestResponse.module.css';

const transition: Transition = { duration: 0.35, ease: [0.55, 0, 0, 1] };

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
  const responses = Object.entries(operation.responses as { [code: string]: OpenAPIV3.ResponseObject });

  if (responses.length) {
    return (
      <div className={styles.grid}>
        <div className={cx(styles.item, styles.header)}>
          <div className={styles.subItem}>Responses</div>
        </div>

        {responses.map(([code, response]) => (
          <Response key={code} code={code} response={response} />
        ))}
      </div>
    );
  }

  return null;
};

const Response = ({ code, response }: ResponseProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        className={cx(styles.item, styles.itemToggler)}
        onClick={() => setIsOpen((open) => !open)}>
        <div className={styles.subItem}>
          <Tag statusCode={Number(code) as Tag.HttpResponseStatusCodes} />
          <ChevronIcon
            title=""
            chevronDirection={isOpen ? 'up' : 'right'}
            transition={{ duration: 0.35, ease: [0.55, 0, 0, 1] }}
            className={styles.togglerIcon}
          />
        </div>
        <div className={cx(styles.subItem, styles.subItemDescriptionWide)}>
          Temporary description
          {response.description}
        </div>
      </button>

      <m.div
        className={cx(styles.item, styles.itemContent)}
        initial={isOpen ? 'expanded' : 'collapsed'}
        animate={isOpen ? 'expanded' : 'collapsed'}
        transition={transition}
        variants={{
          expanded: { opacity: 1, height: 'auto' },
          collapsed: { opacity: 0, height: 0 },
        }}>
        <div className={styles.itemContentInner}>Response body</div>
      </m.div>
    </>
  );
};

type PropsRequestResponseProps = ApiOperation;

interface ResponseProps {
  code: string;
  response: OpenAPIV3.ResponseObject;
}
