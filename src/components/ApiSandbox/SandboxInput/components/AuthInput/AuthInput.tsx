import { useState } from 'react';

import * as RadixSelect from '@radix-ui/react-select';
import * as RadixTooltip from '@radix-ui/react-tooltip';
import { cx } from 'class-variance-authority';

import { useAuth } from '@/components/ApiSandbox/context/hook';
import { Flex } from '@/components/Flex';
import { Link } from '@/components/Link';
import { Note } from '@/components/Note';
import { Icon } from '@/icons';
import { AuthOption } from '@/lib/operations/param-state/types';

import styles from './AuthInput.module.css';

const authLabel = (header: AuthOption) => (header === 'apikey' ? 'API Key' : 'Basic');

const AuthInput = () => {
  const [showNotes, setShowNotes] = useState(false);

  const auth = useAuth();

  const value = auth.authValue;

  if (auth.authOptions.length === 0) return null;

  const isEmpty = !auth.authValue || (auth.authOption === 'basic' && value === ':');

  return (
    !!auth.authOption && (
      <>
        <Flex className={styles.root} wrap={false} gap="none">
          <RadixSelect.Root
            value={auth.authOption}
            onValueChange={auth.updateAuthOption}
            disabled={auth.authOptions.length < 2}>
            <RadixSelect.Trigger aria-label="auth method" asChild>
              <Flex className={styles.select} wrap={false} gap="2xs">
                {auth.authOptions.length >= 2 && <Icon name="chevronDown" title="select" />}

                <RadixSelect.Value>
                  <div>{authLabel(auth.authOption)}</div>
                </RadixSelect.Value>
              </Flex>
            </RadixSelect.Trigger>

            <RadixSelect.Content className={styles.selectContainer}>
              <RadixSelect.Viewport>
                {auth.authOptions.map((h) => (
                  <RadixSelect.Item key={h} value={h} className={styles.selectItem} asChild>
                    <Flex wrap={false} gap="2xs">
                      <RadixSelect.ItemIndicator className={styles.selectItemIndicator}>
                        <Icon name="action/check" title="selected" />
                      </RadixSelect.ItemIndicator>
                      <RadixSelect.ItemText>{authLabel(h)}</RadixSelect.ItemText>
                    </Flex>
                  </RadixSelect.Item>
                ))}
              </RadixSelect.Viewport>
            </RadixSelect.Content>
          </RadixSelect.Root>

          {auth.authOption === 'apikey' && (
            <ApiKeyInput
              type={auth.isAuthHidden ? 'password' : 'text'}
              value={value ?? ''}
              onValueChange={(value) => auth.updateAuthValue(value)}
            />
          )}

          {auth.authOption === 'basic' && (
            <BasicInputs
              type={auth.isAuthHidden ? 'password' : 'text'}
              value={value ?? ''}
              onValueChange={(value) => auth.updateAuthValue(value)}
            />
          )}

          <Flex className={styles.buttonsContainer} wrap={false} gap="xs">
            <button
              className={cx(styles.button, { [styles.hidden]: isEmpty })}
              onClick={() => auth.updateAuthValue('')}>
              <Icon name="action/close" title="clear" />
            </button>

            <RadixTooltip.Provider delayDuration={0}>
              <RadixTooltip.Root>
                <RadixTooltip.Trigger asChild>
                  <button className={styles.button} onClick={auth.toggleHideAuth}>
                    <Icon
                      name={auth.isAuthHidden ? 'action/eye' : 'action/eye-slashed'}
                      title={`${auth.isAuthHidden ? 'Show' : 'Hide'} credentials`}
                    />
                  </button>
                </RadixTooltip.Trigger>
                <RadixTooltip.Content sideOffset={5} className={styles.tooltip}>
                  {auth.isAuthHidden ? 'Show' : 'Hide'}
                </RadixTooltip.Content>
              </RadixTooltip.Root>
            </RadixTooltip.Provider>

            <RadixTooltip.Provider delayDuration={0}>
              <RadixTooltip.Root>
                <RadixTooltip.Trigger asChild>
                  <button
                    className={cx(styles.button, {
                      [styles.active]: showNotes,
                    })}
                    onClick={() => setShowNotes((s) => !s)}>
                    <Icon name="question" title="Header information" />
                  </button>
                </RadixTooltip.Trigger>
                <RadixTooltip.Content sideOffset={5} className={styles.tooltip}>
                  {auth.authOption === 'apikey' ? 'Getting your API Key' : 'Using basic authentication'}
                </RadixTooltip.Content>
              </RadixTooltip.Root>
            </RadixTooltip.Provider>
          </Flex>
        </Flex>

        {showNotes && (auth.authOption === 'apikey' ? <ApiKeyNote /> : <BasicNote />)}
      </>
    )
  );
};

export default AuthInput;

const ApiKeyInput = ({
  type,
  value,
  onValueChange,
}: {
  type: 'text' | 'password';
  value: string;
  onValueChange: (v: string) => void;
}) => {
  return (
    <input
      name="api-key"
      className={styles.input}
      type={type}
      placeholder="API Key"
      value={value}
      onChange={(e) => onValueChange(e.target.value)}
    />
  );
};

const BasicInputs = ({
  type,
  value,
  onValueChange,
}: {
  type: 'text' | 'password';
  value: string;
  onValueChange: (v: string) => void;
}) => {
  const [user = '', password = ''] = value.split(':');
  const concatValue = (u: string, p: string) => `${u}:${p}`;
  return (
    <>
      <input
        name="user-credential"
        className={styles.input}
        type={type}
        placeholder="user"
        value={user}
        onChange={(e) => onValueChange(concatValue(e.target.value, password))}
      />
      <span className={styles.inputSeparator}>:</span>
      <input
        name="password-credential"
        className={styles.input}
        type={type}
        placeholder="password"
        value={password}
        onChange={(e) => onValueChange(concatValue(user, e.target.value))}
      />
    </>
  );
};

const ApiKeyNote = () => (
  <Note headline="Getting your API Key" variant="note" className={styles.notes}>
    You can{' '}
    <Link href="/accounts-and-teams/api-key" target="_blank" rel="noopener noreferrer">
      find your API Key
    </Link>{' '}
    within your User Settings or you can request (or reset) it via the Users Token API Endpoint. <br />
    <br />
    Cloudsmith Entitlement Tokens cannot be used to authenticate to the Cloudsmith API. Entitlement Tokens are
    used to authenticate for package downloads only.
  </Note>
);

const BasicNote = () => (
  <Note headline="Basic Authentication" variant="warning" className={styles.notes}>
    The simplest (but least recommended) way to authenticate is to provide your login email and password when
    making API requests. <br />
    <br />
    Disclosure of your email and password will allow a malicious third-party to takeover your account and
    cause damage. We recommend using an API Key instead and using a lesser privileged account for API access.
  </Note>
);
