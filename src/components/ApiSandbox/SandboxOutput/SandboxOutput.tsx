import { CodeBlockSync } from '@/components/CodeBlock/CodeBlockSync';
import { Flex } from '@/components/Flex';
import { Note } from '@/components/Note';
import { Paragraph } from '@/components/Paragraph';
import { Tag } from '@/components/Tag';
import { buildCurlCommand } from '@/lib/operations/api/builders';
import { ApiOperation } from '@/lib/swagger/types';

import { useApiTest, useAuth, useMedia, useParameters } from '../context/hook';
import styles from './SandboxOutput.module.css';

type SandboxOutputProps = {
  operation: ApiOperation;
};

export const SandboxOutput = ({ operation }: SandboxOutputProps) => {
  const { pathParamState, queryParamState, bodyParamState } = useParameters();
  const { authOption, authValue, isAuthHidden } = useAuth();
  const { media } = useMedia();
  const { apiResponse } = useApiTest();

  const command = buildCurlCommand(
    operation,
    {
      path: pathParamState,
      query: queryParamState,
      body: bodyParamState,
    },
    [authOption, authValue, isAuthHidden],
    media,
  );

  const statusTag =
    (apiResponse?.status ?? -1) > 0 ? (
      <Tag statusCode={Number(apiResponse?.status) as Tag.HttpResponseStatusCodes} />
    ) : null;
  const stringResponse =
    (apiResponse?.status ?? -1) > 0 && apiResponse?.body ? JSON.stringify(apiResponse.body, null, 4) : null;

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

      {apiResponse?.status === null ? (
        <Note variant="caution" headline="Error">
          <Paragraph>{apiResponse?.body?.error}</Paragraph>
        </Note>
      ) : null}
    </Flex>
  );
};
