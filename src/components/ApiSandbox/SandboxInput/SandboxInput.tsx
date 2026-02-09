import { cx } from 'class-variance-authority';

import { Button } from '@/components/Button';
import { ClipboardCopy } from '@/components/ClipboardCopy/ClipboardCopy';
import { Flex } from '@/components/Flex';
import { Tag } from '@/components/Tag';
import { Icon } from '@/icons';
import {
  AuthOption,
  BodyParamState,
  ParamState,
  PathParamState,
  QueryParamState,
  SimpleParamState,
  StringParamState,
} from '@/lib/operations/param-state/types';
import { operationUrl } from '@/lib/operations/util';
import { ApiOperation, ParameterObject, RequestBodyObject } from '@/lib/swagger/types';

import AuthInput from './components/AuthInput';
import OperationSelect from './components/OperationSelect';
import PathParams from './components/PathParams';
import QueryParams from './components/QueryParams';
import RequestBody from './components/RequestBody';
import styles from './SandboxInput.module.css';

type SandboxInputProps = {
  operation: ApiOperation;
  operations: ApiOperation[];
  parameters: {
    path: ParameterObject[];
    query: ParameterObject[];
    body: RequestBodyObject | undefined;
  };
  paramState: {
    path: PathParamState;
    query: QueryParamState;
    body: BodyParamState;
  };
  currentHeader: AuthOption;
  media: string;
  auths: AuthOption[];
  authState: {
    current: AuthOption;
    apikey: string;
    basic: string;
    hidden: boolean;
  };
  isFetchingResponse: boolean;
  onCallApi: () => void;
  onCloseSandbox: () => void;
  onUpdateCurrentHeader: (h: AuthOption) => void;
  onChangeMedia: (m: string) => void;
  onChangeHeader: (h: AuthOption, value: string) => void;
  onChangeOperation: (o: ApiOperation) => void;
  onUpdatePathState: (key: string, value: StringParamState) => void;
  onUpdateQueryState: (key: string, value: SimpleParamState) => void;
  onUpdateBodyState: (keys: string[], value: ParamState | undefined) => void;
  onToggleHideHeader: () => void;
};

export const SandboxInput = ({
  operation,
  operations,
  parameters,
  paramState,
  auths,
  media,
  currentHeader,
  authState,
  isFetchingResponse,
  onCloseSandbox,
  onCallApi,
  onChangeMedia,
  onChangeHeader,
  onChangeOperation,
  onUpdatePathState,
  onUpdateQueryState,
  onUpdateBodyState,
  onUpdateCurrentHeader,
  onToggleHideHeader,
}: SandboxInputProps) => {
  const { path, query, body } = parameters;

  const url = operationUrl(operation);

  return (
    <Flex className={styles.root} direction="column" align="start" wrap={false}>
      <button className={styles.closeButton} onClick={onCloseSandbox}>
        <Icon name="action/close" title="close dialog" />
      </button>

      <OperationSelect value={operation} onValueChange={onChangeOperation} options={operations} />

      <Flex gap="xs" wrap={false} style={{ width: '100%' }}>
        <ClipboardCopy textToCopy={url} className={styles.urlCopy}>
          <Tag className={styles.method} method={operation.method} />
          <span className={cx('bodyS', styles.url)}>{url}</span>
        </ClipboardCopy>

        <Button
          style={{ flexShrink: 0 }}
          withArrow
          className={styles.headerButton}
          onClick={onCallApi}
          disabled={isFetchingResponse}>
          Send
        </Button>
      </Flex>

      <Flex className={styles.params} direction="column">
        <AuthInput
          auths={auths}
          currentHeader={currentHeader}
          authState={authState[currentHeader]}
          hideAuth={authState.hidden}
          onChangeHeader={onChangeHeader}
          onUpdateCurrentHeader={onUpdateCurrentHeader}
          onToggleHideHeader={onToggleHideHeader}
        />

        {path.length > 0 ? (
          <PathParams
            parameters={path}
            state={paramState.path}
            onUpdateParam={(name, value) => onUpdatePathState(name, value)}
          />
        ) : null}

        {query.length > 0 ? (
          <QueryParams
            parameters={query}
            state={paramState.query}
            onUpdateParam={(name, value) => onUpdateQueryState(name, value)}
          />
        ) : null}

        {body ? (
          <RequestBody
            requestBody={body}
            state={paramState.body}
            media={media}
            onChangeMedia={onChangeMedia}
            onUpdateParam={(keys, value) => onUpdateBodyState(keys, value)}
          />
        ) : null}
      </Flex>
    </Flex>
  );
};
