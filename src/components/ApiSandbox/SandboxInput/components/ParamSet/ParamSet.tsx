import { ReactNode, useState } from 'react';

import { cx } from 'class-variance-authority';

import { Flex } from '@/components/Flex';
import { Paragraph } from '@/components/Paragraph';
import { Tag } from '@/components/Tag';
import { Icon } from '@/icons';
import { SimpleParamState } from '@/lib/operations/types';
import { textualSchemaRules } from '@/lib/operations/util';
import { ArraySchemaObject, NonArraySchemaObjectType, SchemaObject } from '@/lib/swagger/types';

import ParamInput from './inputs';
import styles from './ParamSet.module.css';

type RootParamSetProps = {
  heading: ReactNode;
  children: ReactNode;
};

const RootParamSet = ({ heading, children }: RootParamSetProps) => {
  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <div className={cx(styles.heading, 'monoXSUppercase')}>{heading}</div>
      </div>

      {children}
    </div>
  );
};

type ParamSetProps = {
  heading: ReactNode;
  children: ReactNode;
  name?: string;
  item?: boolean;
  required: boolean;
  description?: string;
  schema: SchemaObject;
  onDeleteItem?: (keys: string[]) => void;
};

export const ParamSet = ({
  heading,
  name,
  required,
  description,
  schema,
  item = false,
  children,
  onDeleteItem,
}: ParamSetProps) => {
  const [collapsed, setCollapsed] = useState(true);

  const descriptionText = getParamDescription(description || '', textualSchemaRules(schema ?? {}));

  return (
    <Flex
      direction="column"
      className={cx(styles.setRoot, styles.paramEntry, {
        [styles.collapsed]: collapsed,
        [styles.isItem]: item,
      })}
      align="stretch"
      gap="none"
      wrap={false}>
      {name && (
        <Flex className={cx(styles.basics, styles.full)} gap="2xs" wrap align="center">
          <div className={styles.name}>{name}</div>
          <div className={styles.paramType}>object</div>

          {required && <Tag variant="light-red">Required</Tag>}
        </Flex>
      )}

      {descriptionText && name && (
        <Flex className={styles.details} gap="2xs">
          <Paragraph className={styles.description}>{descriptionText}</Paragraph>
        </Flex>
      )}

      <div className={styles.set}>
        <div className={styles.header}>
          <Flex className={cx(styles.heading, 'monoXSUppercase')} gap="3xs" asChild>
            <button onClick={() => setCollapsed((c) => !c)}>
              <Icon name={collapsed ? 'chevronDown' : 'chevronUp'} title={collapsed ? 'Hide' : 'Collapse'} />{' '}
              {heading}
            </button>
          </Flex>

          {item && (
            <button className={styles.delete} onClick={() => onDeleteItem?.(name ? [name] : [])}>
              <Icon name="action/delete" title="remove" />
            </button>
          )}
        </div>

        {!collapsed && <>{children}</>}
      </div>
    </Flex>
  );
};

type ParamArrayProps = {
  children: ReactNode;
  name?: string;
  description?: string;
  required: boolean;
  schema: ArraySchemaObject;
  onAddItem: () => void;
};

export const ParamArray = ({ name, description, required, schema, children, onAddItem }: ParamArrayProps) => {
  const descriptionText = getParamDescription(description || '', textualSchemaRules(schema ?? {}));

  const typeLabel = `${schema.type} of ${schema.items?.type}s` + (schema.nullable ? ' | null' : '');

  return (
    <Flex
      direction="column"
      className={cx(styles.arrayRoot, styles.paramEntry)}
      align="stretch"
      gap="none"
      wrap={false}>
      {name && (
        <Flex className={cx(styles.basics, styles.full)} gap="2xs" wrap align="center">
          <div className={styles.name}>{name}</div>
          <div className={styles.paramType}>{typeLabel}</div>

          {required && <Tag variant="light-red">Required</Tag>}
        </Flex>
      )}

      {descriptionText && (
        <Flex className={cx(styles.details, styles.noXPadd)} gap="2xs">
          <Paragraph className={styles.description}>{descriptionText}</Paragraph>
        </Flex>
      )}

      <div className={styles.array}>{children}</div>

      <Flex direction="column" className={styles.add} align="stretch" gap="none" asChild>
        <button onClick={() => onAddItem()}>
          <Flex align="center" wrap={false} gap="xs">
            <Icon name="action/add" title="add" />
            <span>Add {schema.items.type}</span>
          </Flex>
        </button>
      </Flex>
    </Flex>
  );
};

const getParamDescription = (baseDescription: string, rules: string[]) => {
  let final = baseDescription;

  if (final.length > 0 && !final.trimEnd().endsWith('.')) {
    final = final.trimEnd() + '.';
  }

  rules.forEach((r) => {
    final += ' ' + (r.length > 0 && !r.trimEnd().endsWith('.') ? r.trimEnd() + '.' : r);
  });

  return final;
};

type ParamEntryProps = {
  name: string;
  description?: string;
  schema?: SchemaObject;
  required?: boolean;
  noKey?: boolean;
  item?: boolean;
  value?: SimpleParamState;
  onValueChange: (v: SimpleParamState) => void;
  onDeleteItem?: () => void;
};

export const ParamEntry = ({
  name,
  description,
  schema,
  required = false,
  value,
  noKey = false,
  item = false,
  onValueChange,
  onDeleteItem,
}: ParamEntryProps) => {
  // TODO: extend
  const type = schema?.type as NonArraySchemaObjectType;
  const typeLabel =
    schema == null
      ? 'string'
      : (schema.type === 'array'
          ? `${schema.type} of ${schema.items?.type}s`
          : schema.format || schema.type) + (schema.nullable ? ' | null' : '');

  const descriptionText = getParamDescription(description || '', textualSchemaRules(schema ?? {}));
  return (
    <Flex
      direction="column"
      className={cx(styles.paramEntry, { [styles.isItem]: item })}
      align="stretch"
      gap="none"
      wrap={false}>
      <Flex className={styles.main} justify="between" align="center" wrap={false}>
        {!noKey && (
          <Flex className={styles.basics} gap="2xs" wrap align="center">
            <div className={styles.name}>{name}</div>
            <div className={styles.paramType}>{typeLabel}</div>

            {required && <Tag variant="light-red">Required</Tag>}
          </Flex>
        )}

        <ParamInput
          name={name}
          type={type}
          value={value}
          singleLine={noKey}
          isItem={item}
          possibleValues={schema?.enum as (string | number)[]}
          onChange={(v) => onValueChange(v)}
          onDeleteItem={onDeleteItem}
        />
      </Flex>

      {descriptionText && (
        <Flex className={styles.details} gap="2xs">
          <Paragraph className={styles.description}>{descriptionText}</Paragraph>
        </Flex>
      )}
    </Flex>
  );
};

type ParamToggleProps = {
  paramTag: string;
  show: boolean;
  onChangeShow: (s: boolean) => void;
};

export const ParamToggle = ({ paramTag, show, onChangeShow }: ParamToggleProps) => (
  <Flex direction="column" className={styles.toggle} align="stretch" gap="none" asChild>
    <button onClick={() => onChangeShow(!show)}>
      <Flex align="center" wrap={false} gap="2xs">
        <Icon name={show ? 'chevronUp' : 'chevronDown'} title={show ? 'hide' : 'show'} />
        <span>
          {show ? 'Hide' : 'Show'} {paramTag}
        </span>
      </Flex>
    </button>
  </Flex>
);

export default RootParamSet;
