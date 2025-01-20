import { Tag } from '@/components';
import { ApiOperation } from '@/lib/swagger/types';
import { ApiGrid, ApiGridColumn, ApiGridRow, ApiGridRowContent } from '../_components/ApiGrid';
import { RequiredTag } from '../_components/RequireTag';

import styles from './Request.module.css';
import { Response } from '../_responses/Responses';
import { MediaResponse } from '../_components/ApiMedia';
import React from 'react';

export const Request = (operation: ApiOperation) => {
  const getParametersByParam = (param: string) => operation.parameters?.filter((p) => p.in === param);
  const pathsParameters = getParametersByParam('path');
  const queryParameters = getParametersByParam('query');

  return (
    <>
      <div className={styles.request}>
        <div className={styles.url}>
          <Tag method={operation.method} />
          {`${process.env.NEXT_PUBLIC_CLOUDSMITH_API_URL}${operation.path}`}
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
          <RequiredTag isRequired={param.required} />
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
        Body params <RequiredTag isRequired={requestBody.required} />
      </>
    }>
    <ApiGridRow>
      <ApiGridColumn type="media">
        <MediaResponse {...requestBody} />
      </ApiGridColumn>
    </ApiGridRow>
  </ApiGrid>
);
