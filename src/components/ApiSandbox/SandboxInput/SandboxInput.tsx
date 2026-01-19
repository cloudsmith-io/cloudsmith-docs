import { cx } from 'class-variance-authority';

import { Flex } from '@/components/Flex';
import { ApiOperation } from '@/lib/swagger/types';
import { getParametersByParam } from '@/lib/swagger/util';
import { operationUrl } from '@/lib/url';

import { ClipboardCopy } from '../../ClipboardCopy/ClipboardCopy';
import { Tag } from '../../Tag';
import { PathParams, QueryParams, RequestBody } from './components';
import OperationSelect from './components/OperationSelect';
import styles from './SandboxInput.module.css';

type SandboxInputProps = {
  operation: ApiOperation;
  operations: ApiOperation[];
  onChangeOperation: (o: ApiOperation) => void;
};

export const SandboxInput = ({ operation, operations, onChangeOperation }: SandboxInputProps) => {
  const pathsParameters = getParametersByParam(operation, 'path');
  const queryParameters = getParametersByParam(operation, 'query');
  const bodyParameters = operation.requestBody;

  const url = operationUrl(operation);

  return (
    <Flex className={styles.root} direction="column" align="start" wrap={false}>
      <OperationSelect value={operation} onValueChange={onChangeOperation} options={operations} />

      <ClipboardCopy textToCopy={url} className={styles.urlCopy}>
        <Tag className={styles.method} method={operation.method} />
        <span className={cx('bodyS', styles.url)}>{url}</span>
      </ClipboardCopy>

      <div className={styles.params}>
        {pathsParameters?.length ? <PathParams parameters={pathsParameters} /> : null}

        {queryParameters?.length ? <QueryParams parameters={queryParameters} /> : null}

        {bodyParameters ? <RequestBody requestBody={bodyParameters} /> : null}
      </div>
    </Flex>
  );
};
