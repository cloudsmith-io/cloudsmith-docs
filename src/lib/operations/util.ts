import { ApiOperation } from '../swagger/types';
import { operationUrl } from '../url';

/**
 * Turns an operation slug into a fully qualified local path to use in links
 */
export const operationPath = (slug: string): string => {
  return `/api/${slug}`;
};

export const getParametersByParam = (operation: ApiOperation, param: string) =>
  operation.parameters?.filter((p) => p.in === param);

export const operationKey = (op: ApiOperation) => `${op.method}-${op.path}`;

export const curlCommand = (
  op: ApiOperation,
  // pathParams?: any,
  // queryParams?: any,
  // bodyParams?: any,
  // header?: any,
) => {
  let command = `curl --request ${op.method.toUpperCase()} \\\n`;

  command += `     --url '${operationUrl(op).replaceAll('\{', '').replaceAll('\}', '')}' \\\n`;

  command += `     --header 'accept:application/json'`;

  return command;
};
