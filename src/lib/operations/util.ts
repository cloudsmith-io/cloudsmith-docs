import { ApiOperation, SchemaObject } from '../swagger/types';
import { AuthOption } from './param-state/types';

/**
 * Turns an operation slug into a fully qualified local path to use in links
 */
export const operationPath = (slug: string): string => {
  return `/api/${slug}`;
};

/**
 * Turns operation into unique key string
 */
export const operationKey = (op: ApiOperation) => `${op.method}-${op.path}`;

/**
 * Gets full API url for operation
 */
export const operationUrl = (operation: ApiOperation) =>
  `${process.env.NEXT_PUBLIC_CLOUDSMITH_API_URL}/${operation.version}${operation.path}/`;

/**
 * Filters operation's parameters based on type
 */
export const operationParametersByType = (operation: ApiOperation, type: 'path' | 'query') =>
  operation.parameters?.filter((p) => p.in === type);

/**
 * Retrieves operation's authentication options
 */
export const operationAuthOptions = (operation: ApiOperation): AuthOption[] =>
  Array.from(
    new Set(
      (operation.security ?? [])
        .flatMap((s) => Object.keys(s))
        .filter((s) => s === 'apikey' || s === 'basic'),
    ),
  ).toSorted();

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
