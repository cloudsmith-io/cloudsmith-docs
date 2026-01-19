import { ApiOperation } from './swagger/types';

export const operationUrl = (operation: ApiOperation) =>
  `${process.env.NEXT_PUBLIC_CLOUDSMITH_API_URL}/${operation.version}${operation.path}`;
