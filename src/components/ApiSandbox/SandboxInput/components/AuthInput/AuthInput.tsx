import * as RadixSelect from '@radix-ui/react-select';

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
        placeholder={currentHeader === 'apikey' ? 'API Key' : 'User:pass'}
        value={headersState ?? ''}
        onChange={(e) => onChangeHeader(currentHeader, e.target.value)}
      />
    </Flex>
  );
};

export default AuthInput;
