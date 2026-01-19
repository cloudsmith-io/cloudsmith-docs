import { ApiGrid, ApiGridColumn, ApiGridRow } from '@/components/ApiGrid';
import { ApiMediaResponse } from '@/components/ApiMedia';
import { Tag } from '@/components/Tag';
import { ApiOperation } from '@/lib/swagger/types';

export const PathParams = ({ parameters }: { parameters: NonNullable<ApiOperation['parameters']> }) => (
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

export const QueryParams = ({ parameters }: { parameters: NonNullable<ApiOperation['parameters']> }) => (
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

export const RequestBody = ({ requestBody }: { requestBody: NonNullable<ApiOperation['requestBody']> }) => (
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
