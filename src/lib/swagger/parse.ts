import SwaggerParser from '@apidevtools/swagger-parser';
import { OpenAPIV3 } from 'openapi-types';
import { ApiDefinition, ApiMenuSection, ApiOperation } from './types';
import { isHttpMethod, parseMenuSegments } from './util';

/**
 * Parses the swagger schema with the Swagger Parser library to resolve refs
 */
export const parseSchema = async (): Promise<OpenAPIV3.Document> => {
  const schema = (await SwaggerParser.parse(`src/content/api-schema-v2.json`)) as OpenAPIV3.Document;

  if (!schema) {
    throw new Error('Failed to parse API schema');
  }

  return schema;
};

/**
 * Transforms the schema into a custom ApiDefinition type so it's
 * a bit easier to work with when generating the menu and content pages.
 */
export const transformSchema = async (schema: OpenAPIV3.Document): Promise<ApiDefinition> => {
  const operations: ApiOperation[] = [];
  const menu: ApiMenuSection[] = [];

  for (const path in schema.paths) {
    const pathObject = schema.paths[path];
    for (const method in pathObject) {
      if (isHttpMethod(method)) {
        const operation = pathObject[method as keyof OpenAPIV3.PathItemObject] as ApiOperation;
        operation.path = path;
        operation.method = method as OpenAPIV3.HttpMethods;

        if (operation.operationId) {
          const segments = parseMenuSegments(operation.operationId);

          // Assign last part of segment to name of operation
          operation.name = segments.pop() || 'Unknown';

          // Add segments to menu tree so we can easily render later
          let parent: any[] = menu;
          for (let i = 0; i < segments.length; i++) {
            const name = segments[i];
            let existing = parent.find((child) => child.name === name);
            if (!existing) {
              existing = { name, children: [] };
              parent.push(existing);
            }

            parent = existing.children;
          }

          parent.push(operation);
          operation.menuSegments = segments;
        }

        operations.push(operation);
      }
    }
  }

  return { operations, menu };
};
