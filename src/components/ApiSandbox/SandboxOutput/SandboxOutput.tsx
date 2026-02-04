import { CodeBlockSync } from '@/components/CodeBlock/CodeBlockSync';
import { Flex } from '@/components/Flex';
import { Note } from '@/components/Note';
import { Paragraph } from '@/components/Paragraph';
import { Tag } from '@/components/Tag';
import { BodyParamState, PathParamState, QueryParamState } from '@/lib/operations/types';
import { curlCommand } from '@/lib/operations/util';
import { ApiOperation } from '@/lib/swagger/types';

import styles from './SandboxOutput.module.css';

type SandboxOutputProps = {
  operation: ApiOperation;
  paramState: {
    path: PathParamState;
    query: QueryParamState;
    body: BodyParamState;
  };
  media: string;
  auth: 'apikey' | 'basic' | null;
  authValue: string | null;
  hiddenAuth: boolean;
  response:
    | {
        status: null;
        body: {
          error: string;
        };
      }
    | {
        status: number;
        body: object;
      }
    | undefined;
};

export const SandboxOutput = ({
  operation,
  paramState,
  media,
  auth,
  authValue,
  response,
  hiddenAuth,
}: SandboxOutputProps) => {
  const command = curlCommand(operation, paramState, [auth, authValue, hiddenAuth], media);

  const statusTag =
    (response?.status ?? -1) > 0 ? (
      <Tag statusCode={Number(response?.status) as Tag.HttpResponseStatusCodes} />
    ) : null;
  const stringResponse =
    (response?.status ?? -1) > 0 && response?.body ? JSON.stringify(response.body, null, 4) : null;

  return (
    <Flex className={styles.root} gap="xs" justify="start" direction="column" wrap={false}>
      <CodeBlockSync
        lang="shell"
        variant="darker"
        header={<span>cURL Request</span>}
        className={styles.request}>
        {command}
      </CodeBlockSync>

      {stringResponse ? (
        <CodeBlockSync
          lang="json"
          variant="darker"
          header={<span>Response {statusTag}</span>}
          className={styles.response}>
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
