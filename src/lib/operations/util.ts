import { ApiOperation } from '../swagger/types';

export const operationUrl = (operation: ApiOperation) =>
  `${process.env.NEXT_PUBLIC_CLOUDSMITH_API_URL}/${operation.version}${operation.path}`;

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
  parameters: {
    path: Record<string, string>;
  },
) => {
  let command = `curl --request ${op.method.toUpperCase()} \\\n`;

  const baseUrl = operationUrl(op);

  const pathReplacedUrl = Object.entries(parameters.path).reduce((url, current) => {
    const [param, value] = current;
    const template = `{${param}}`;
    if (value !== '' && url.includes(template)) {
      return url.replaceAll(`{${param}}`, value);
    }
    return url;
  }, baseUrl);

  const cleanedUrl = pathReplacedUrl.replaceAll('\{', '').replaceAll('\}', '');

  command += `     --url '${cleanedUrl}' \\\n`;

  command += `     --header 'accept:application/json'`;

  return command;
};
