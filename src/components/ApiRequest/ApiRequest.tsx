import { Tag } from '@/components';
import { ApiOperation } from '@/lib/swagger/types';

import { ApiGrid, ApiGridColumn, ApiGridRow } from '../ApiGrid';
import { ApiMediaResponse } from '../ApiMedia';
import styles from './ApiRequest.module.css';

export const ApiRequest = (operation: ApiOperation) => {
  const getParametersByParam = (param: string) => operation.parameters?.filter((p) => p.in === param);
  const pathsParameters = getParametersByParam('path');
  const queryParameters = getParametersByParam('query');

  return (
    <>
      <div className={styles.request}>
        <div className={styles.url}>
          <Tag method={operation.method} />
          {`${process.env.NEXT_PUBLIC_CLOUDSMITH_API_URL}/${operation.version}${operation.path}`}
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
