import { cx } from 'class-variance-authority';

import { Button } from '@/components/Button';
import { ClipboardCopy } from '@/components/ClipboardCopy/ClipboardCopy';
import { Flex } from '@/components/Flex';
import { Tag } from '@/components/Tag';
import { Icon } from '@/icons';
import { trackAnalyticsEvent } from '@/lib/analytics';
import { operationUrl } from '@/lib/operations/util';
import { ApiOperation } from '@/lib/swagger/types';

import { useApiTest } from '../context/hook';
import AuthInput from './components/AuthInput';
import OperationSelect from './components/OperationSelect';
import PathParams from './components/PathParams';
import QueryParams from './components/QueryParams';
import RequestBody from './components/RequestBody';
import styles from './SandboxInput.module.css';

type SandboxInputProps = {
  operation: ApiOperation;
  operations: ApiOperation[];

  onCloseSandbox: () => void;
  onChangeOperation: (o: ApiOperation) => void;
};

const SandboxInput = ({ operation, operations, onCloseSandbox, onChangeOperation }: SandboxInputProps) => {
  const url = operationUrl(operation);

  const { callApi, isFetchingApi } = useApiTest();

  const handleSend = () => {
    callApi();
    trackAnalyticsEvent('apiSandboxSubmit', {
      path: operation.path,
      operationId: operation.operationId,
      method: operation.method,
    });
  };

  return (
    <Flex className={styles.root} direction="column" align="start" wrap={false}>
      <button className={styles.closeButton} onClick={onCloseSandbox}>
        <Icon name="action/close" title="close dialog" />
      </button>

      <OperationSelect value={operation} onValueChange={onChangeOperation} options={operations} />

      <Flex gap="xs" wrap={false} className={styles.urlWrapper}>
        <ClipboardCopy textToCopy={url} className={styles.urlCopy}>
          <Tag className={styles.method} method={operation.method} />
          <span className={cx('bodyS', styles.url)}>{url}</span>
        </ClipboardCopy>

        <Button withArrow className={styles.sendButton} onClick={handleSend} disabled={isFetchingApi}>
          Send
        </Button>
      </Flex>

      <Flex className={styles.params} direction="column">
        <AuthInput />

        <PathParams />

        <QueryParams />

        <RequestBody />
      </Flex>
    </Flex>
  );
};

export default SandboxInput;
