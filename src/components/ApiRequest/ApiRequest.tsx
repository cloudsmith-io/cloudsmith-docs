import { Button, Tag } from '@/components';
import { ApiOperation } from '@/lib/swagger/types';
import { operationUrl } from '@/lib/url';

import { ApiGrid, ApiGridColumn, ApiGridRow } from '../ApiGrid';
import { ApiMediaResponse } from '../ApiMedia';
import { ApiSandbox } from '../ApiSandbox';
import { ClipboardCopy } from '../ClipboardCopy/ClipboardCopy';
import styles from './ApiRequest.module.css';

export const ApiRequest = ({
  operation,
  operations,
}: {
  operation: ApiOperation;
  operations: ApiOperation[];
}) => {
  const getParametersByParam = (param: string) => operation.parameters?.filter((p) => p.in === param);
  const pathsParameters = getParametersByParam('path');
  const queryParameters = getParametersByParam('query');

  const url = operationUrl(operation);

  return (
    <>
      <div className={styles.request}>
        <div className={styles.sandbox}>
          <ClipboardCopy textToCopy={url} className={styles.url}>
            <Tag className={styles.method} method={operation.method} />
            {url}
          </ClipboardCopy>

          <Button withArrow size="medium" width="large">
            Try it out
          </Button>
        </div>
      </div>

      {pathsParameters?.length ? <PathParams parameters={pathsParameters} /> : null}
      {queryParameters?.length ? <QueryParams parameters={queryParameters} /> : null}
      {operation.requestBody ? <RequestBody requestBody={operation.requestBody} /> : null}
    </>
  );
};

const PathParams = ({ parameters }: { parameters: NonNullable<ApiOperation['parameters']> }) => (
  <ApiGrid heading="Path params">
    {parameters.map((param) => (
      <ApiGridRow key={param.name}>
        <ApiGridColumn>{param.name}</ApiGridColumn>
        <ApiGridColumn type="type">{param.schema?.type}</ApiGridColumn>
        <ApiGridColumn>
          <Tag variant={param.required ? 'red' : 'grey'}>{param.required ? 'required' : 'optional'}</Tag>
        </ApiGridColumn>
      </ApiGridRow>
    ))}
  </ApiGrid>
);

const QueryParams = ({ parameters }: { parameters: NonNullable<ApiOperation['parameters']> }) => (
  <ApiGrid heading="Query params">
    {parameters.map((param) => (
      <ApiGridRow key={param.name}>
        <ApiGridColumn>{param.name}</ApiGridColumn>
        <ApiGridColumn type="type">{param.schema?.type}</ApiGridColumn>
        <ApiGridColumn type="description">{param.description}</ApiGridColumn>
      </ApiGridRow>
    ))}
  </ApiGrid>
);

const RequestBody = ({ requestBody }: { requestBody: NonNullable<ApiOperation['requestBody']> }) => (
  <ApiGrid
    heading={
      <>
        {'Body params '}
        <Tag variant={requestBody.required ? 'red' : 'grey'}>
          {requestBody.required ? 'required' : 'optional'}
        </Tag>
      </>
    }>
    <ApiGridRow>
      <ApiGridColumn type="media">
        <ApiMediaResponse response={requestBody} variant="request-body" />
      </ApiGridColumn>
    </ApiGridRow>
  </ApiGrid>
);
