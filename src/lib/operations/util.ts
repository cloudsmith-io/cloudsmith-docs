import { ApiOperation } from '../swagger/types';

export const operationUrl = (operation: ApiOperation) =>
  `${process.env.NEXT_PUBLIC_CLOUDSMITH_API_URL}/${operation.version}${operation.path}/`;

/**
 * Turns an operation slug into a fully qualified local path to use in links
 */
export const operationPath = (slug: string): string => {
  return `/api/${slug}`;
};

export const getParametersByParam = (operation: ApiOperation, param: string) =>
  operation.parameters?.filter((p) => p.in === param);

export const getHeaderOptions = (operation: ApiOperation) =>
  Array.from(
    new Set(
      (operation.security ?? [])
        .flatMap((s) => Object.keys(s))
        .filter((s) => s === 'apikey' || s === 'basic'),
    ),
  ).toSorted();

export const operationKey = (op: ApiOperation) => `${op.method}-${op.path}`;

export const curlCommand = (
  op: ApiOperation,
  parameters: {
    path: Record<string, string>;
    query: Record<string, string>;
  },
  _header: ['apikey' | 'basic' | null, string | null],
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

  const finalUrl = Object.entries(parameters.query)
    .filter((entry) => entry[1] !== '')
    .reduce((url, current, index) => {
      let currenUrl: string = url;
      if (index === 0) {
        currenUrl += '?';
      } else {
        currenUrl += '&';
      }
      currenUrl += `${current[0]}=${current[1]}`;

      return currenUrl;
    }, cleanedUrl);

  command += `     --url '${finalUrl}' \\\n`;

  const [header, headerValue] = _header;

  if (header && headerValue) {
    const headerStart = header === 'apikey' ? 'X-Api-Key: ' : 'authorization: Basic ';
    const headerEnd = header === 'apikey' ? headerValue : btoa(headerValue);
    command += `     --header '${headerStart}${headerEnd}' \\\n`;
  }

  command += `     --header 'accept:application/json' \\\n`;
  command += `     --header 'content-type: application/json' `;

  return command;
};
