import { ApiOperation, SchemaObject } from '../swagger/types';

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
    body: Record<string, Record<string, string>>;
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

  if (parameters.body && parameters.body['application/json']) {
    const bodyParams = Object.entries(parameters.body['application/json']).filter((entry) => entry[1] != '');
    if (bodyParams.length > 0) {
      command += `\\\n`;
      command += `     --data '\n`;
      command += `{\n`;
      bodyParams.forEach((param, index) => {
        command += `  "${param[0]}": "${param[1]}"`;
        if (index < bodyParams.length - 1) {
          command += ',';
        }
        command += '\n';
      });
      command += `}\n`;
      command += `'`;
    }
  }

  return command;
};

/*
  Based on:
  https://spec.openapis.org/oas/v3.0.3.html#properties
  https://datatracker.ietf.org/doc/html/draft-wright-json-schema-validation-00#section-5
*/
export const textualSchemaRules = (schema: SchemaObject) =>
  Object.entries(schema).reduce<string[]>((acc, [key, value]) => {
    if (!value) {
      return acc;
    }

    switch (key) {
      // Validation keywords for numeric instances
      case 'multipleOf':
        acc.push(`multiple of ${value}`);
        break;
      case 'maximum':
        if (!schema.minimum) {
          acc.push(`length ≤ ${value}${schema.exclusiveMaximum ? ' (exclusive)' : ''}`);
        }
        break;
      case 'minimum':
        if (!schema.maximum) {
          acc.push(`length ≥ ${value}${schema.exclusiveMinimum ? ' (exclusive)' : ''}`);
        }
        if (schema.maximum) {
          acc.push(`length between ${value} and ${schema.maximum}`);
        }
        break;

      // Validation keywords for strings
      case 'maxLength':
        if (!schema.minLength) {
          acc.push(`length ≤ ${value}`);
        }
        break;
      case 'minLength':
        if (!schema.maxLength) {
          acc.push(`length ≥ ${value}`);
        }
        if (schema.maxLength) {
          acc.push(`length between ${value} and ${schema.maxLength}`);
        }
        break;
      case 'pattern':
        acc.push(`${value}`);
        break;

      // Validation keywords for arrays
      case 'additionalItems':
        if (value === false) {
          acc.push('No additional items allowed');
        }
        break;
      case 'maxItems':
        if (!schema.minItems) {
          acc.push(`items ≤ ${value}`);
        }
        break;
      case 'minItems':
        if (!schema.maxItems) {
          acc.push(`items ≥ ${value}`);
        }
        if (schema.maxItems) {
          const uniqueText = schema.uniqueItems ? ' (unique)' : '';
          acc.push(`items between ${value} and ${schema.maxItems}${uniqueText}`);
        }
        break;
      case 'uniqueItems':
        if (value === true && !schema.minItems && !schema.maxItems) {
          acc.push('Items must be unique');
        }
        break;

      // Validation keywords for objects
      case 'maxProperties':
        acc.push(`length ≤ ${value}`);
        break;
      case 'minProperties':
        acc.push(`length ≥ ${value}`);
        break;
      case 'additionalProperties':
        if (value === false) {
          acc.push('no additional properties allowed');
        }
        break;

      // Validation keywords for any instance type
      case 'enum':
        acc.push(`Allowed values: ${value.join(', ')}`);
        break;
      case 'format':
        // TODO: Decide what to do with format
        // acc.push(`${value}`);
        break;
      case 'default':
        acc.push(`Defaults to ${value}`);
        break;

      // TODO: What should we render here?
      case 'allOf':
        acc.push('Must match all schemas');
        break;
      case 'anyOf':
        acc.push('Must match any schema');
        break;
      case 'oneOf':
        acc.push('Must match exactly one schema');
        break;
      case 'not':
        acc.push('Must not match schema');
        break;
    }
    return acc;
  }, []);
