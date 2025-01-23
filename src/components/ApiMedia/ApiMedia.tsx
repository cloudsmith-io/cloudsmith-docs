import { Tag } from '@/components';
import { RequestBodyObject, ResponseObject, SchemaObject } from '@/lib/swagger/types';
import { cx } from 'class-variance-authority';
import React from 'react';

import styles from './ApiMedia.module.css';

export const ApiMediaResponse = (response: ResponseObject | RequestBodyObject) => {
  return (
    <>
      {response.content ? (
        <div className={styles.responseType}>
          <p className={styles.responseTitle}>
            {response.description || 'Response body'}
            {` - ${Object.keys(response.content)[0]}`}
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

const Schema = ({ schema }: { media: string; schema: SchemaObject }) => {
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
          {Object.entries(properties).map(([name, property]) => {
            const isRequired = required?.includes(name);

            return (
              <div key={name} className={styles.responseGridRow}>
                <div className={styles.responseGridColumn}>{name}</div>
                <div className={cx(styles.responseGridColumn, styles.responseGridColumnType)}>
                  {property.format || property.type}
                  {property.nullable && ' | null'}
                </div>
                <div className={styles.responseGridColumn}>
                  <Tag variant={isRequired ? 'red' : 'grey'}>{isRequired ? 'required' : 'optional'}</Tag>
                </div>
                <div className={cx(styles.responseGridColumn, styles.responseGridColumnRules)}>
                  <ValidationRules schema={property} />
                  {/* <pre style={{ border: '1px solid red' }}>{JSON.stringify(property, null, 2)}</pre> */}
                </div>
                {property.description ? (
                  <div className={cx(styles.responseGridColumn, styles.responseGridColumnDescription)}>
                    {property.description}
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      ) : null}
    </>
  );
};

/*
  Based on:
  https://spec.openapis.org/oas/v3.0.3.html#properties
  https://datatracker.ietf.org/doc/html/draft-wright-json-schema-validation-00#section-5
*/
const ValidationRules = ({ schema }: { schema: SchemaObject }) => {
  const rules = Object.entries(schema).reduce<string[]>((acc, [key, value]) => {
    if (!value) {
      return acc;
    }

    switch (key) {
      // Validation keywords for numeric instances
      case 'multipleOf':
        acc.push(`multiple of ${value}`);
        break;
      case 'maximum':
        if (!schema.minimum) {
          acc.push(`length ≤ ${value}${schema.exclusiveMaximum ? ' (exclusive)' : ''}`);
        }
        break;
      case 'minimum':
        if (!schema.maximum) {
          acc.push(`length ≥ ${value}${schema.exclusiveMinimum ? ' (exclusive)' : ''}`);
        }
        if (schema.maximum) {
          acc.push(`length between ${value} and ${schema.maximum}`);
        }
        break;

      // Validation keywords for strings
      case 'maxLength':
        if (!schema.minLength) {
          acc.push(`length ≤ ${value}`);
        }
        break;
      case 'minLength':
        if (!schema.maxLength) {
          acc.push(`length ≥ ${value}`);
        }
        if (schema.maxLength) {
          acc.push(`length between ${value} and ${schema.maxLength}`);
        }
        break;
      case 'pattern':
        acc.push(`${value}`);
        break;

      // Validation keywords for arrays
      case 'additionalItems':
        if (value === false) {
          acc.push('No additional items allowed');
        }
        break;
      case 'maxItems':
        if (!schema.minItems) {
          acc.push(`items ≤ ${value}`);
        }
        break;
      case 'minItems':
        if (!schema.maxItems) {
          acc.push(`items ≥ ${value}`);
        }
        if (schema.maxItems) {
          const uniqueText = schema.uniqueItems ? ' (unique)' : '';
          acc.push(`items between ${value} and ${schema.maxItems}${uniqueText}`);
        }
        break;
      case 'uniqueItems':
        if (value === true && !schema.minItems && !schema.maxItems) {
          acc.push('items must be unique');
        }
        break;

      // Validation keywords for objects
      case 'maxProperties':
        acc.push(`length ≤ ${value}`);
        break;
      case 'minProperties':
        acc.push(`length ≥ ${value}`);
        break;
      case 'additionalProperties':
        if (value === false) {
          acc.push('no additional properties allowed');
        }
        break;

      // Validation keywords for any instance type
      case 'enum':
        acc.push(`allowed values ${value.join(', ')}`);
        break;
      case 'format':
        acc.push(`${value}`);
        break;
      case 'default':
        acc.push(`defaults to ${value}`);
        break;

      // TODO: What should we render here?
      case 'allOf':
        acc.push('Must match all schemas');
        break;
      case 'anyOf':
        acc.push('Must match any schema');
        break;
      case 'oneOf':
        acc.push('Must match exactly one schema');
        break;
      case 'not':
        acc.push('Must not match schema');
        break;
    }
    return acc;
  }, []);

  if (rules.length) {
    return rules.map((rule, index) => <React.Fragment key={index}>{rule}</React.Fragment>);
  }
};
