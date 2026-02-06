'use client';

import React, { useState } from 'react';

import { cx } from 'class-variance-authority';

import { Tag } from '@/components';
import { ChevronIcon } from '@/icons/Chevron';
import { textualSchemaRules } from '@/lib/operations/util';
import { RequestBodyObject, ResponseObject, SchemaObject } from '@/lib/swagger/types';

import styles from './ApiMedia.module.css';

export const ApiMediaResponse = ({
  response,
  variant,
}:
  | {
      response: ResponseObject;
      variant: 'response';
    }
  | {
      response: RequestBodyObject;
      variant: 'request-body';
    }) => {
  return (
    <>
      {response.content ? (
        <div className={styles.responseType}>
          <p className={cx(styles.responseTitle, 'monoXSUppercase')}>
            {response.description || (variant === 'response' ? 'Response body' : 'Request Body')}
          </p>
          <div className={styles.responseTypeContent}>
            {Object.entries(response.content).map(([media, content]) => (
              <Schema key={media} media={media} schema={content.schema as SchemaObject} />
            ))}
          </div>
        </div>
      ) : null}
    </>
  );
};

const Schema = ({ schema, description }: { media?: string; schema: SchemaObject; description?: string }) => {
  if (schema.type === 'array') {
    return (
      <>
        <p className={cx(styles.responseTypeTitle, 'monoXSUppercase')}>
          {description || `${schema.type} of ${schema.items.type}s`}
        </p>
        <div className={styles.responseTypeContent}>
          <Properties {...schema.items} />
        </div>
      </>
    );
  }

  if (schema.type === 'object') {
    return (
      <>
        <p className={cx(styles.responseTypeTitle, 'monoXSUppercase')}>{description || schema.type}</p>
        <div className={styles.responseTypeContent}>
          <Properties {...schema} />
        </div>
      </>
    );
  }

  return <Properties {...schema} />;
};

const Properties = ({ properties, required, type }: SchemaObject) => {
  return (
    <>
      {type ? <p className={cx(styles.responseTypeTitle, 'monoXSUppercase')}>{type}</p> : null}

      {properties ? (
        <div className={styles.responseGrid}>
          {Object.entries(properties).map(([name, property]) => {
            return <Property key={name} name={name} property={property} required={required} />;
          })}
        </div>
      ) : null}
    </>
  );
};

const Property = ({
  name,
  property,
  required,
}: {
  name: string;
  property: SchemaObject;
  required: string[] | undefined;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const isRequired = required?.includes(name);
  const hasNested = Boolean(property.description) || property.type === 'array' || property.type === 'object';

  function toggleDescriptionVisibility() {
    setIsOpen(!isOpen);
  }

  return (
    <>
      <div
        key={name}
        onClick={toggleDescriptionVisibility}
        className={cx(styles.responseGridRow, { [styles.responseGridRowToggler]: hasNested })}>
        <div className={cx(styles.responseGridColumn, styles.responseGridColumnTitle)}>{name}</div>
        <div className={cx(styles.responseGridColumn, styles.responseGridColumnType)}>
          {property.type === 'array'
            ? `${property.type} of ${property.items?.type}s`
            : property.format || property.type}
          {property.nullable && ' | null'}
        </div>
        <div className={cx(styles.responseGridColumn, styles.responseGridColumnTag)}>
          <Tag variant={isRequired ? 'light-red' : 'grey'}>{isRequired ? 'required' : 'optional'}</Tag>
        </div>
        <div className={cx(styles.responseGridColumn, styles.responseGridColumnRules)}>
          <ValidationRules schema={property} />
        </div>
        <div className={cx(styles.responseGridColumn, styles.responseGridColumnIcon)}>
          {hasNested && (
            <ChevronIcon
              title=""
              chevronDirection={isOpen ? 'up' : 'down'}
              transition={{ duration: 0.2, ease: 'easeInOut' }}
              className={styles.togglerIcon}
            />
          )}
        </div>
      </div>

      {hasNested && (
        <div className={cx(styles.responseGridRow, styles.responseGridRowContent)} aria-hidden={!isOpen}>
          <div className={styles.responseGridRowInner}>
            <div className={cx(styles.responseGridColumn, styles.responseGridColumnDescription)}>
              {property.type === 'array' || property.type === 'object' ? (
                <Schema schema={property} description={property.description} />
              ) : (
                <p className={styles.responseGridColumnInner}>{property.description}</p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const ValidationRules = ({ schema }: { schema: SchemaObject }) => {
  const rules = textualSchemaRules(schema);

  if (rules.length) {
    return rules.map((rule, index) => (
      <React.Fragment key={index}>
        {rule}
        {index < rules.length - 1 ? <br /> : null}
      </React.Fragment>
    ));
  }
};
