import { useCallback, useEffect, useState } from 'react';

import * as RadixSelect from '@radix-ui/react-select';

import { Flex } from '@/components/Flex';
import { Icon } from '@/icons';
import { NonArraySchemaObjectType } from '@/lib/swagger/types';
import { debounce } from '@/lib/util';

import styles from './ParamInput.module.css';

type ParamInput = {
  name: string;
  type: NonArraySchemaObjectType;
  value: string;
  possibleValues: (string | number)[];
  onChange: (v: string) => void;
};

const ParamInput = ({ name, type, value: _value, possibleValues, onChange: _onChange }: ParamInput) => {
  const [value, setValue] = useState(_value);
  useEffect(() => setValue(_value), [_value]);

  const onChange = useCallback(debounce(_onChange, 200), [_onChange]);

  if (possibleValues?.length > 0) {
    return (
      <div className={styles.root}>
        <RadixSelect.Root value={value} onValueChange={onChange}>
          <RadixSelect.Trigger aria-label={name} asChild>
            <Flex className={styles.select} wrap={false} gap="2xs">
              <Icon className={styles.icon} name="chevronDown" title="select" />

              <RadixSelect.Value placeholder="Select value">
                <span className={styles.selectValue}>{value}</span>
              </RadixSelect.Value>
            </Flex>
          </RadixSelect.Trigger>

          <RadixSelect.Content className={styles.selectContainer}>
            <RadixSelect.Viewport>
              {possibleValues.map((b) => (
                <RadixSelect.Item key={b} value={`${b}`} className={styles.selectItem}>
                  <RadixSelect.ItemIndicator className={styles.selectItemIndicator}>
                    <Icon name="action/check" title="selected" />
                  </RadixSelect.ItemIndicator>
                  <RadixSelect.ItemText>{`${b}`}</RadixSelect.ItemText>
                </RadixSelect.Item>
              ))}
            </RadixSelect.Viewport>
          </RadixSelect.Content>
        </RadixSelect.Root>
        {value !== '' && (
          <button
            className={styles.reset}
            onClick={(e) => {
              e.stopPropagation();
              onChange('');
            }}>
            <Icon className={styles.icon} name="action/close" title="reset" />
          </button>
        )}
      </div>
    );
  }

  if (type === 'boolean') {
    return (
      <div className={styles.root}>
        <RadixSelect.Root value={value} onValueChange={onChange}>
          <RadixSelect.Trigger aria-label={name} asChild>
            <Flex className={styles.select} wrap={false} gap="2xs">
              <Icon className={styles.icon} name="chevronDown" title="select" />

              <RadixSelect.Value placeholder="Select value">
                <span className={styles.selectValue}>{value}</span>
              </RadixSelect.Value>
            </Flex>
          </RadixSelect.Trigger>

          <RadixSelect.Content className={styles.selectContainer}>
            <RadixSelect.Viewport>
              {['true', 'false'].map((b) => (
                <RadixSelect.Item key={b} value={b} className={styles.selectItem}>
                  <RadixSelect.ItemIndicator className={styles.selectItemIndicator}>
                    <Icon name="action/check" title="selected" />
                  </RadixSelect.ItemIndicator>
                  <RadixSelect.ItemText>{b}</RadixSelect.ItemText>
                </RadixSelect.Item>
              ))}
            </RadixSelect.Viewport>
          </RadixSelect.Content>
        </RadixSelect.Root>
        {value !== '' && (
          <button
            className={styles.reset}
            onClick={(e) => {
              e.stopPropagation();
              onChange('');
            }}>
            <Icon className={styles.icon} name="action/close" title="reset" />
          </button>
        )}
      </div>
    );
  }

  if (type === 'integer')
    return (
      <input
        name={name}
        type="number"
        className={styles.root}
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
      />
    );

  return (
    <input
      name={name}
      type="text"
      className={styles.root}
      value={value}
      onChange={(e) => {
        setValue(e.target.value);
        onChange(e.target.value);
      }}
    />
  );
};

export default ParamInput;
