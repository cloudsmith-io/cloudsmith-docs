import { ReactNode } from 'react';

import { cx } from 'class-variance-authority';

import { Flex } from '@/components/Flex';
import { Paragraph } from '@/components/Paragraph';
import { Tag } from '@/components/Tag';
import { Icon } from '@/icons';
import { textualSchemaRules } from '@/lib/operations/util';
import { NonArraySchemaObjectType, SchemaObject } from '@/lib/swagger/types';

import ParamInput from './inputs';
import styles from './ParamSet.module.css';

type ParamSetProps = {
  heading: ReactNode;
  children: ReactNode;
};

const ParamSet = ({ heading, children }: ParamSetProps) => {
  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <div className={cx(styles.heading, 'monoXSUppercase')}>{heading}</div>
      </div>

      {children}
    </div>
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

type ParamProps = {
  name: string;
  description?: string;
  schema?: SchemaObject;
  required?: boolean;
  value?: string;
  onValueChange: (v: string) => void;
};

export const Param = ({
  name,
  description,
  schema,
  required = false,
  value = '',
  onValueChange,
}: ParamProps) => {
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
    <Flex direction="column" className={styles.param} align="stretch" gap="none">
      <Flex className={styles.main} justify="between" align="center">
        <Flex className={styles.basics} gap="2xs" wrap align="center">
          <div className={styles.name}>{name}</div>
          <div className={styles.paramType}>{typeLabel}</div>

          <Tag variant={required ? 'light-red' : 'grey'}>{required ? 'required' : 'optional'}</Tag>
        </Flex>

        <ParamInput
          name={name}
          type={type}
          value={value}
          possibleValues={schema?.enum as (string | number)[]}
          onChange={(v) => onValueChange(v)}
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
      <Flex align="center" wrap={false} gap="xs">
        <Icon name={show ? 'chevronUp' : 'chevronDown'} title={show ? 'hide' : 'show'} />
        <span>
          {show ? 'Hide' : 'Show'} {show ? 'optional' : 'all'} {paramTag}
        </span>
      </Flex>
    </button>
  </Flex>
);

export default ParamSet;
