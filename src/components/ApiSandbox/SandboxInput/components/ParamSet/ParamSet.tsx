import { ReactNode } from 'react';

import { cx } from 'class-variance-authority';

import { Flex } from '@/components/Flex';
import { Paragraph } from '@/components/Paragraph';
import { Tag } from '@/components/Tag';
import { Icon } from '@/icons';
import { NonArraySchemaObjectType } from '@/lib/swagger/types';

import ParamInput from './inputs';
import styles from './ParamSet.module.css';

type ParamSetProps = {
  heading: string;
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

type ParamProps = {
  name: string;
  description?: string;
  type: NonArraySchemaObjectType;
  required?: boolean;
  value?: string;
  onValueChange: (v: string) => void;
};

export const Param = ({
  name,
  description,
  type,
  required = false,
  value = '',
  onValueChange,
}: ParamProps) => (
  <Flex direction="column" className={styles.paramWrapper} align="stretch" gap="none">
    <Flex className={styles.param} justify="between" align="center" wrap={false}>
      <Flex className={styles.name} gap="2xs" wrap align="center">
        <div className={styles.nameName}>{name}</div>
        <div className={styles.paramType}>{type}</div>
        <div>
          <Tag variant={required ? 'tomato' : 'grey'}>{required ? 'required' : 'optional'}</Tag>
        </div>
      </Flex>

      <ParamInput type={type} value={value} onChange={(v) => onValueChange(v)} />
    </Flex>
    {description && (
      <Flex className={styles.secondRow} gap="2xs">
        <Paragraph className={styles.description}>{description}</Paragraph>
      </Flex>
    )}
  </Flex>
);

type ParamToggleProps = {
  paramTag: string;
  show: boolean;
  onChangeShow: (s: boolean) => void;
};

export const ParamToggle = ({ paramTag, show, onChangeShow }: ParamToggleProps) => (
  <Flex direction="column" className={styles.paramWrapper} align="stretch" gap="none" asChild>
    <button className={styles.toggle} onClick={() => onChangeShow(!show)}>
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
