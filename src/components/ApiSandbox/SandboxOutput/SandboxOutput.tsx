import { useMemo } from 'react';

import { CodeBlockClient } from '@/components/CodeBlock/CodeBlockClient';
import { Flex } from '@/components/Flex';
import { Tag } from '@/components/Tag';
import { buildCurlCommand } from '@/lib/operations/api/builders';
import { ApiOperation } from '@/lib/swagger/types';

import { useApiTest, useAuth, useMedia, useParameters } from '../context/hook';
import styles from './SandboxOutput.module.css';

type SandboxOutputProps = {
  operation: ApiOperation;
};

export const SandboxOutput = ({ operation }: SandboxOutputProps) => {
  return (
    <Flex className={styles.root} gap="xs" justify="start" direction="column" wrap={false}>
      <Command operation={operation} />

      <Result />
    </Flex>
  );
};

const Command = ({ operation }: { operation: ApiOperation }) => {
  const { pathParamState, queryParamState, bodyParamState } = useParameters();
  const { authOption, authValue, isAuthHidden } = useAuth();
  const { media } = useMedia();

  const command = useMemo(
    () =>
      buildCurlCommand(
        operation,
        {
          path: pathParamState,
          query: queryParamState,
          body: bodyParamState,
        },
        [authOption, authValue, isAuthHidden],
        media,
      ),
    [operation, pathParamState, queryParamState, bodyParamState, media, authOption, authValue, isAuthHidden],
  );

  return (
    <CodeBlockClient
      lang="shell"
      variant="darker"
      header={<span>cURL Request</span>}
      className={styles.request}>
      {command}
    </CodeBlockClient>
  );
};

const byteSize = (str: string) => new Blob([str]).size;
const RESPONSE_SIZE_LIMIT = 1000000;

const Result = () => {
  const { apiResponse, isFetchingApi } = useApiTest();

  const statusTag =
    (apiResponse?.status ?? -1) > 0 ? (
      <Tag statusCode={Number(apiResponse?.status) as Tag.HttpResponseStatusCodes} />
    ) : null;

  const stringResponse = useMemo(() => {
    return (apiResponse?.status ?? -1) > 0 && apiResponse?.body
      ? JSON.stringify(apiResponse.body, null, 4)
      : '';
  }, [apiResponse]);
  const responseSize = useMemo(() => byteSize(stringResponse), [stringResponse]);
  const responseTooLarge = responseSize > RESPONSE_SIZE_LIMIT;

  // if (apiResponse?.status) throw new Error();

  return (
    <>
      {isFetchingApi && (
        <CodeBlockClient
          lang="text"
          variant="darker"
          header={<span>Response</span>}
          className={styles.response}>
          Loading...
        </CodeBlockClient>
      )}

      {apiResponse?.status === null ? (
        <CodeBlockClient
          lang="text"
          variant="darker"
          isError
          header={<span>Response</span>}
          className={styles.response}>
          {apiResponse?.body?.error}
        </CodeBlockClient>
      ) : null}

      {apiResponse?.status != null && !responseTooLarge ? (
        <CodeBlockClient
          lang="json"
          variant="darker"
          header={<span>Response {statusTag}</span>}
          className={styles.response}>
          {stringResponse}
        </CodeBlockClient>
      ) : null}

      {apiResponse?.status != null && responseTooLarge ? (
        <CodeBlockClient
          lang="text"
          variant="darker"
          isError
          header={<span>Response {statusTag}</span>}
          className={styles.response}>
          API Response is too large to display.
        </CodeBlockClient>
      ) : null}
    </>
  );
};
