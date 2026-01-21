import { cx } from 'class-variance-authority';

import { ClipboardCopy } from '@/components/ClipboardCopy/ClipboardCopy';
import { Flex } from '@/components/Flex';
import { Tag } from '@/components/Tag';
import { operationUrl } from '@/lib/operations/util';
import { ApiOperation, ParameterObject, RequestBodyObject } from '@/lib/swagger/types';

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
  };
  onChangeOperation: (o: ApiOperation) => void;
  onUpdateState: (type: 'param' | 'query' | 'body', name: string, value: string) => void;
};

export const SandboxInput = ({
  operation,
  operations,
  onChangeOperation,
  parameters,
  paramState,
  onUpdateState,
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

      <div className={styles.params}>
        {path.length > 0 ? (
          <PathParams
            parameters={path}
            state={paramState.path}
            onUpdateParam={(name, value) => onUpdateState('param', name, value)}
          />
        ) : null}

        {query.length > 0 ? <QueryParams parameters={query} /> : null}

        {body ? <RequestBody requestBody={body} /> : null}
      </div>
    </Flex>
  );
};
