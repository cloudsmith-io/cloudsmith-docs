import { useEffect } from 'react';

import { Button } from '@/components/Button';
import { CodeBlockSync } from '@/components/CodeBlock/CodeBlockSync';
import { Flex } from '@/components/Flex';
import { Note } from '@/components/Note';
import { Paragraph } from '@/components/Paragraph';
import { Tag } from '@/components/Tag';
import { useApi } from '@/lib/operations/hooks';
import { curlCommand, operationKey } from '@/lib/operations/util';
import { ApiOperation } from '@/lib/swagger/types';

import styles from './SandboxOutput.module.css';

type SandboxOutputProps = {
  operation: ApiOperation;
  paramState: {
    path: Record<string, string>;
    query: Record<string, string>;
    body: Record<string, Record<string, string>>;
  };
  header: 'apikey' | 'basic' | null;
  headerValue: string | null;
};

export const SandboxOutput = ({ operation, paramState, header, headerValue }: SandboxOutputProps) => {
  const command = curlCommand(operation, paramState, [header, headerValue]);

  const { response, isFetching, call, reset } = useApi(operation, paramState, header, headerValue);

  const key = operationKey(operation);
  useEffect(() => {
    reset();
  }, [key, reset]);

  const statusTag =
    (response?.status ?? -1) > 0 ? (
      <Tag statusCode={Number(response?.status) as Tag.HttpResponseStatusCodes} />
    ) : null;
  const stringResponse =
    (response?.status ?? -1) > 0 && response?.body ? JSON.stringify(response.body, null, 4) : null;

  return (
    <Flex className={styles.root} gap="xs" justify="start" direction="column" wrap={false}>
      <Flex className={styles.header} justify="between">
        <Paragraph>cURL Request</Paragraph>

        <Button
          withArrow={!isFetching}
          className={styles.headerButton}
          onClick={() => {
            call();
          }}
          disabled={isFetching}>
          {isFetching ? 'Loading' : 'Try it'}
        </Button>
      </Flex>

      <CodeBlockSync
        lang="shell"
        variant="darker"
        header={<span className={styles.requestHeader}>Request</span>}
        className={styles.request}>
        {command}
      </CodeBlockSync>

      {stringResponse ? (
        <CodeBlockSync lang="json" variant="darker" header={statusTag} className={styles.response}>
          {stringResponse}
        </CodeBlockSync>
      ) : null}

      {response?.status === null ? (
        <Note variant="caution" headline="Error">
          <Paragraph>{response?.body?.error}</Paragraph>
        </Note>
      ) : null}
    </Flex>
  );
};
