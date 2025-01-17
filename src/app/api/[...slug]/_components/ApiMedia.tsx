import { ResponseObject, SchemaObject } from '@/lib/swagger/types';
import { cx } from 'class-variance-authority';
import { RequiredTag } from '../_components/RequireTag';

import styles from './ApiMedia.module.css';

export const MediaResponse = (response: ResponseObject) => {
  return (
    <>
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
