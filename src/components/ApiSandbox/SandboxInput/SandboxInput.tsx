import { cx } from 'class-variance-authority';

import { ClipboardCopy } from '@/components/ClipboardCopy/ClipboardCopy';
import { Flex } from '@/components/Flex';
import { Tag } from '@/components/Tag';
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
    path: Record<string, string>;
    query: Record<string, string>;
    body: Record<string, Record<string, string>>;
  };
  currentHeader: 'apikey' | 'basic';
  headers: ('apikey' | 'basic')[];
  headersState: Record<string, string>;
  onUpdateCurrentHeader: (h: 'apikey' | 'basic') => void;
  onChangeHeader: (h: 'apikey' | 'basic', value: string) => void;
  onChangeOperation: (o: ApiOperation) => void;
  onUpdateState: (type: 'path' | 'query' | 'body', name: string, value: string, media?: string) => void;
};

export const SandboxInput = ({
  operation,
  operations,
  parameters,
  paramState,
  headers,
  currentHeader,
  headersState,
  onChangeHeader,
  onChangeOperation,
  onUpdateState,
  onUpdateCurrentHeader,
}: SandboxInputProps) => {
  const { path, query, body } = parameters;

  const url = operationUrl(operation);

  return (
    <Flex className={styles.root} direction="column" align="start" wrap={false}>
      <OperationSelect value={operation} onValueChange={onChangeOperation} options={operations} />

      <ClipboardCopy textToCopy={url} className={styles.urlCopy}>
        <Tag className={styles.method} method={operation.method} />
        <span className={cx('bodyS', styles.url)}>{url}</span>
      </ClipboardCopy>

      <Flex className={styles.params} direction="column">
        <AuthInput
          headers={headers}
          currentHeader={currentHeader}
          headersState={headersState[currentHeader]}
          onChangeHeader={onChangeHeader}
          onUpdateCurrentHeader={onUpdateCurrentHeader}
        />

        {path.length > 0 ? (
          <PathParams
            parameters={path}
            state={paramState.path}
            onUpdateParam={(name, value) => onUpdateState('path', name, value)}
          />
        ) : null}

        {query.length > 0 ? (
          <QueryParams
            parameters={query}
            state={paramState.query}
            onUpdateParam={(name, value) => onUpdateState('query', name, value)}
          />
        ) : null}

        {body ? (
          <RequestBody
            requestBody={body}
            state={paramState.body}
            onUpdateParam={(meta, name, value) => onUpdateState('body', name, value, meta)}
          />
        ) : null}
      </Flex>
    </Flex>
  );
};
