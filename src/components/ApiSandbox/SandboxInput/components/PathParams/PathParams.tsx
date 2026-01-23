import { useCallback, useEffect, useState } from 'react';

import { cx } from 'class-variance-authority';

import { Flex } from '@/components/Flex';
import { Tag } from '@/components/Tag';
import { ApiOperation } from '@/lib/swagger/types';
import { debounce } from '@/lib/util';

import styles from './PathParams.module.css';

type PathParamsProps = {
  parameters: NonNullable<ApiOperation['parameters']>;
  state: Record<string, string>;
  onUpdateParam: (name: string, value: string) => void;
};

const ParamInput = ({
  value: _value,
  onChange: _onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) => {
  const [value, setValue] = useState(_value);
  useEffect(() => setValue(_value), [_value]);

  const onChange = useCallback(debounce(_onChange, 300), [_onChange]);

  return (
    <input
      className={styles.input}
      value={value}
      onChange={(e) => {
        setValue(e.target.value);
        onChange(e.target.value);
      }}
    />
  );
};

const PathParams = ({ parameters, state, onUpdateParam }: PathParamsProps) => (
  <div className={styles.root}>
    <div className={styles.header}>
      <div className={cx(styles.heading, 'monoXSUppercase')}>Path params</div>
    </div>

    {parameters.map((param) => (
      <Flex key={param.name} className={styles.param} justify="between" align="center" wrap={false}>
        <Flex className={styles.name} gap="2xs" wrap align="center">
          <div className={styles.nameName}>{param.name}</div>
          <div className={styles.paramType}>{param.schema?.type}</div>
          <div>
            <Tag variant={param.required ? 'tomato' : 'grey'}>{param.required ? 'required' : 'optional'}</Tag>
          </div>
        </Flex>

        <ParamInput value={state[param.name] ?? ''} onChange={(v) => onUpdateParam(param.name, v)} />
      </Flex>
    ))}
  </div>
);

export default PathParams;
