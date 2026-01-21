import { cx } from 'class-variance-authority';

import { Tag } from '@/components';
import { getParametersByParam, operationUrl } from '@/lib/operations/util';
import { ApiOperation } from '@/lib/swagger/types';

import { ApiGrid, ApiGridColumn, ApiGridRow } from '../ApiGrid';
import { ApiMediaResponse } from '../ApiMedia';
import { ApiSandboxDialog } from '../ApiSandbox';
import { ClipboardCopy } from '../ClipboardCopy/ClipboardCopy';
import styles from './ApiRequest.module.css';

export const ApiRequest = ({
  operation,
  operations,
}: {
  operation: ApiOperation;
  operations: ApiOperation[];
}) => {
  const pathsParameters = getParametersByParam(operation, 'path');
  const queryParameters = getParametersByParam(operation, 'query');

  const url = operationUrl(operation);

  return (
    <>
      <div className={styles.request}>
        <div className={styles.sandbox}>
          <ClipboardCopy textToCopy={url} className={styles.urlCopy}>
            <Tag className={styles.method} method={operation.method} />
            <span className={cx('bodyS', styles.url)}>{url}</span>
          </ClipboardCopy>

          <ApiSandboxDialog operation={operation} operations={operations} />
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
