import { useState } from 'react';

import * as RadixSelect from '@radix-ui/react-select';
import * as RadixTooltip from '@radix-ui/react-tooltip';

import { Flex } from '@/components/Flex';
import { Icon } from '@/icons';

import styles from './AuthInput.module.css';

type AuthInputProps = {
  currentHeader: 'apikey' | 'basic';
  headers: ('apikey' | 'basic')[];
  headersState: string;
  onChangeHeader: (h: 'apikey' | 'basic', value: string) => void;
  onUpdateCurrentHeader: (h: 'apikey' | 'basic') => void;
};

const authLabel = (header: 'apikey' | 'basic') => (header === 'apikey' ? 'API Key' : 'Basic');

const AuthInput = ({
  currentHeader,
  headers,
  headersState,
  onChangeHeader,
  onUpdateCurrentHeader,
}: AuthInputProps) => {
  const [hideAuth, setHideAuth] = useState(false);

  if (headers.length === 0) return null;

  return (
    <Flex className={styles.root} wrap={false} gap="none">
      <RadixSelect.Root
        value={currentHeader}
        onValueChange={onUpdateCurrentHeader}
        disabled={headers.length < 2}>
        <RadixSelect.Trigger aria-label="Food" asChild>
          <Flex className={styles.select} wrap={false} gap="xs">
            {headers.length >= 2 && <Icon name="chevronDown" title="select" />}
            <RadixSelect.Value>
              <div>{authLabel(currentHeader)}</div>
            </RadixSelect.Value>
          </Flex>
        </RadixSelect.Trigger>

        <RadixSelect.Content className={styles.selectContainer}>
          <RadixSelect.Viewport>
            {headers.map((h) => (
              <RadixSelect.Item key={h} value={h} className={styles.selectItem}>
                <RadixSelect.ItemIndicator className={styles.selectItemIndicator}>
                  <Icon name="action/check" title="selected" />
                </RadixSelect.ItemIndicator>
                <RadixSelect.ItemText>{authLabel(h)}</RadixSelect.ItemText>
              </RadixSelect.Item>
            ))}
          </RadixSelect.Viewport>
        </RadixSelect.Content>
      </RadixSelect.Root>

      <input
        className={styles.input}
        type={hideAuth ? 'password' : 'text'}
        autoComplete="off"
        placeholder={currentHeader === 'apikey' ? 'API Key' : 'User:pass'}
        value={headersState ?? ''}
        onChange={(e) => onChangeHeader(currentHeader, e.target.value)}
      />

      <Flex className={styles.iconsContainer} wrap={false} gap="xs">
        <RadixTooltip.Provider delayDuration={0}>
          <RadixTooltip.Root>
            <RadixTooltip.Trigger asChild>
              <button className={styles.hideButton} onClick={() => setHideAuth((h) => !h)}>
                <Icon name={hideAuth ? 'action/eye' : 'action/eye-slashed'} title="Hide credentials" />
              </button>
            </RadixTooltip.Trigger>
            <RadixTooltip.Content sideOffset={5} className={styles.tooltip}>
              {hideAuth ? 'Show' : 'Hide'}
            </RadixTooltip.Content>
          </RadixTooltip.Root>
        </RadixTooltip.Provider>

        <RadixTooltip.Provider delayDuration={0}>
          <RadixTooltip.Root>
            <RadixTooltip.Trigger>
              <Icon name="question" title="Header information" />
            </RadixTooltip.Trigger>
            <RadixTooltip.Content sideOffset={5} className={styles.tooltip}>
              Header
            </RadixTooltip.Content>
          </RadixTooltip.Root>
        </RadixTooltip.Provider>
      </Flex>
    </Flex>
  );
};

export default AuthInput;
