import { useCallback, useEffect, useState } from 'react';

import * as RadixSelect from '@radix-ui/react-select';
import { cx } from 'class-variance-authority';

import { Flex } from '@/components/Flex';
import { Icon } from '@/icons';
import {
  BooleanParamState,
  NumberParamState,
  SimpleParamState,
  StringParamState,
} from '@/lib/operations/types';
import { NonArraySchemaObjectType } from '@/lib/swagger/types';
import { debounce } from '@/lib/util';

import styles from './ParamInput.module.css';

type ParamInput = {
  name: string;
  type: NonArraySchemaObjectType;
  value?: SimpleParamState;
  possibleValues: (string | number)[];
  singleLine?: boolean;
  isItem?: boolean;
  onChange: (v: SimpleParamState) => void;
  onDeleteItem?: () => void;
};

const ParamInput = ({
  name,
  type,
  value: _value,
  singleLine = false,
  isItem = false,
  possibleValues,
  onChange: _onChange,
  onDeleteItem,
}: ParamInput) => {
  const [value, setValue] = useState(_value);
  useEffect(() => setValue(_value), [_value]);

  const onChange = useCallback(debounce(_onChange, 200), [_onChange]);

  const className = cx(styles.root, { [styles.singleLine]: singleLine || isItem, [styles.isItem]: isItem });

  if (possibleValues?.length > 0) {
    const v = value as NumberParamState | StringParamState;
    return (
      <div className={className}>
        <div className={styles.input}>
          <RadixSelect.Root
            value={`${v?.value ?? ''}`}
            onValueChange={(value) => {
              if (v.type === 'string')
                onChange({
                  ...v,
                  value,
                });
              else
                onChange({
                  ...v,
                  value: parseFloat(value),
                });
            }}>
            <RadixSelect.Trigger aria-label={name} asChild>
              <Flex className={styles.select} wrap={false} gap="2xs">
                <Icon className={styles.icon} name="chevronDown" title="select" />

                <RadixSelect.Value placeholder="Select value">
                  <span className={styles.selectValue}>{v?.value}</span>
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
          {(v?.value ?? '') !== '' && (
            <button
              className={styles.reset}
              onClick={(e) => {
                e.stopPropagation();
                if (v.type === 'string')
                  onChange({
                    ...v,
                    value: '',
                  });
                else
                  onChange({
                    ...v,
                    value: null,
                  });
              }}>
              <Icon className={styles.icon} name="action/close" title="reset" />
            </button>
          )}
        </div>
        {isItem && (
          <button className={styles.delete} onClick={() => onDeleteItem?.()}>
            <Icon name="action/delete" title="remove" />
          </button>
        )}
      </div>
    );
  }

  if (type === 'boolean') {
    const v = value as BooleanParamState;

    return (
      <div className={className}>
        <div className={styles.input}>
          <RadixSelect.Root
            value={`${v?.value ?? ''}`}
            onValueChange={(value) => {
              if (['false', 'true'].includes(value))
                onChange({
                  ...v,
                  value: 'true' === value,
                });
            }}>
            <RadixSelect.Trigger aria-label={name} asChild>
              <Flex className={styles.select} wrap={false} gap="2xs">
                <Icon className={styles.icon} name="chevronDown" title="select" />

                <RadixSelect.Value placeholder="Select value">
                  <span className={styles.selectValue}>{v?.value?.toString()}</span>
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
          {value !== null && (
            <button
              className={styles.reset}
              onClick={(e) => {
                e.stopPropagation();
                onChange({
                  ...v,
                  value: null,
                });
              }}>
              <Icon className={styles.icon} name="action/close" title="reset" />
            </button>
          )}
        </div>
        {isItem && (
          <button className={styles.delete} onClick={() => onDeleteItem?.()}>
            <Icon name="action/delete" title="remove" />
          </button>
        )}
      </div>
    );
  }

  if (type === 'integer' || type === 'number') {
    const v = value as NumberParamState;

    return (
      <div className={className}>
        <input
          name={name}
          type="number"
          className={styles.input}
          value={v?.value ?? ''}
          step={type === 'integer' ? 1 : undefined}
          onChange={(e) => {
            const parsed = parseFloat(e.target.value);
            if (!Number.isNaN(parsed)) {
              const newValue = { ...v, value: parsed };
              setValue(newValue);
              onChange(newValue);
            } else {
              const newValue = { ...v, value: null };
              setValue(newValue);
              onChange(newValue);
            }
          }}
        />
        {isItem && (
          <button className={styles.delete} onClick={() => onDeleteItem?.()}>
            <Icon name="action/delete" title="remove" />
          </button>
        )}
      </div>
    );
  }

  const v = value as StringParamState;

  return (
    <div className={className}>
      <input
        name={name}
        type="text"
        className={styles.input}
        value={v?.value ?? ''}
        onChange={(e) => {
          const newValue = { ...v, value: e.target.value };
          setValue(newValue);
          onChange(newValue);
        }}
      />
      {isItem && (
        <button className={styles.delete} onClick={() => onDeleteItem?.()}>
          <Icon name="action/delete" title="remove" />
        </button>
      )}
    </div>
  );
};

export default ParamInput;
