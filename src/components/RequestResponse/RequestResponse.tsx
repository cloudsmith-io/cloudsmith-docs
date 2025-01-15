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

        {/* TODO Request body object */}

        <Heading size="h2">Response</Heading>

        <Responses {...operation} />
      </div>
    </>
  );
};

const RequiredTag = ({ isRequired }: { isRequired: boolean | undefined }) => (
  <Tag variant={isRequired ? 'red' : 'grey'}>{isRequired ? 'required' : 'optional'}</Tag>
);

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
              <RequiredTag isRequired={param.required} />
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

        {responses.map(([code, response], index) => (
          <Response key={code} code={code} response={response} initialOpen={index === 0} />
        ))}
      </div>
    );
  }

  return null;
};

const Response = ({ code, response, initialOpen }: ResponseProps) => {
  const [isOpen, setIsOpen] = useState(initialOpen);

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
          {response.description || 'No description'}
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
        <div className={styles.itemContentInner}>
          {response.content ? (
            <div className={styles.responseType}>
              <p className={styles.responseTitle}>{response.description || 'Response body'}</p>
              <div className={styles.responseTypeContent}>
                {Object.entries(response.content).map(([media, content]) => {
                  const schema = content.schema as SchemaObject;

                  return <Schema key={media} schema={schema} />;
                })}
              </div>
            </div>
          ) : null}
        </div>
      </m.div>
    </>
  );
};

const Schema = ({ schema }: { schema: SchemaObject }) => {
  if (schema.type === 'array') {
    return (
      <>
        <p className={styles.responseTypeTitle}>array of {`${schema.type}s`}</p>
        <div className={styles.responseTypeContent}>
          <Properties {...schema.items} />
        </div>
      </>
    );
  }

  return <Properties {...schema} />;
};

const Properties = ({ properties, required, type }: SchemaObject) => {
  return (
    <>
      {type ? <p className={styles.responseTypeTitle}>{type}</p> : null}

      {properties ? (
        <div className={styles.responseGrid}>
          {Object.entries(properties).map(([name, property]) => (
            <div key={name} className={styles.responseGridRow}>
              <div className={styles.responseGridColumn}>{name}</div>
              <div className={cx(styles.responseGridColumn, styles.responseGridColumnType)}>
                {property.type}
              </div>
              <div className={styles.responseGridColumn}>
                <RequiredTag isRequired={required?.includes(name)} />
              </div>
            </div>
          ))}
        </div>
      ) : null}
    </>
  );
};

type PropsRequestResponseProps = ApiOperation;

interface ResponseProps {
  code: string;
  response: OpenAPIV3.ResponseObject;
  initialOpen?: boolean;
}

// Replicate the OpenAPIV3.SchemaObject type but without ReferenceObject
type SchemaObject = ArraySchemaObject | NonArraySchemaObject;

interface ArraySchemaObject extends BaseSchemaObject {
  type: OpenAPIV3.ArraySchemaObjectType;
  items: SchemaObject;
}

interface NonArraySchemaObject extends BaseSchemaObject {
  type?: OpenAPIV3.NonArraySchemaObjectType;
}

interface BaseSchemaObject extends OpenAPIV3.BaseSchemaObject {
  additionalProperties?: boolean | SchemaObject;
  properties?: { [name: string]: SchemaObject };
  allOf?: SchemaObject[];
  oneOf?: SchemaObject[];
  anyOf?: SchemaObject[];
}
