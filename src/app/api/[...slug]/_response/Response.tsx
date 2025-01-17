'use client';

import { Tag } from '@/components';
import { ChevronIcon } from '@/icons/Chevron';
import { ApiOperation, ResponseObject, SchemaObject } from '@/lib/swagger/types';
import { cx } from 'class-variance-authority';
import { Transition } from 'motion/dist/react';
import * as m from 'motion/react-m';
import { useState } from 'react';
import { RequiredTag } from '../_components/RequireTag';
import { ApiGrid } from '../_components/ApiGrid';

import styles from './Response.module.css';

const transition: Transition = { duration: 0.35, ease: [0.55, 0, 0, 1] };

export const Response = (operation: ApiOperation) => {
  const responses = Object.entries(operation.responses);

  if (responses.length) {
    return (
      <ApiGrid heading="Responses">
        {responses.map(([code, response], index) => (
          <ResponseItem key={code} code={code} response={response} initialOpen={index === 0} />
        ))}
      </ApiGrid>
    );
  }

  return null;
};

const ResponseItem = ({ code, response, initialOpen }: ResponseProps) => {
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
                {property.format || property.type}
                {property.nullable && ' | null'}
              </div>
              <div className={styles.responseGridColumn}>
                <RequiredTag isRequired={required?.includes(name)} />
              </div>
              <div className={cx(styles.responseGridColumn, styles.responseGridColumnRules)}>
                {/* TODO: UI for validation rules */}
                {property.maxLength ? `TODO: Validation rules` : null}
              </div>
            </div>
          ))}
        </div>
      ) : null}
    </>
  );
};

interface ResponseProps {
  code: string;
  response: ResponseObject;
  initialOpen?: boolean;
}
