import { ApiOperation } from '../../swagger/types';
import { defaultMedia } from '../constants';
import { AuthOption, BodyParamState, PathParamState, QueryParamState } from '../param-state/types';
import { resolveApiRequestBody, resolveApiRequestHeaders, resolveApiRequestUrl } from './util';

export const buildCurlCommand = (
  op: ApiOperation,
  paramState: {
    path: PathParamState;
    query: QueryParamState;
    body: BodyParamState;
  },
  auth: [AuthOption | null, string | null, boolean],
  media: string = defaultMedia,
) => {
  let command = `curl --request ${op.method.toUpperCase()} \\\n`;

  const url = resolveApiRequestUrl({
    operation: op,
    path: paramState.path,
    query: paramState.query,
  });

  command += `     --url '${url}' \\\n`;

  const [authOption, authValue, hiddenAuth] = auth;
  const headers = resolveApiRequestHeaders({
    media,
    authOption,
    authValue: authOption === 'basic' && authValue === ':' ? null : authValue,
  });

  Object.entries(headers).forEach(([key, value], index, entries) => {
    if (['X-Api-Key', 'authorization'].includes(key) && hiddenAuth) {
      command += `     --header '${key}: ******************' `;
    } else {
      command += `     --header '${key}: ${value}' `;
    }

    if (index < entries.length - 1) {
      command += '\\\n';
    }
  });

  const { body, count: bodyCount } = resolveApiRequestBody({
    body: paramState.body,
    media,
  });

  if (bodyCount > 0) {
    command += `\\\n`;
    command += `     --data '\n`;
    command += JSON.stringify(body, null, 4);
    command += `\n'`;
  }

  return command;
};
