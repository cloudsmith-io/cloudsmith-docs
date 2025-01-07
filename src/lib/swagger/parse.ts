import SwaggerParser from '@apidevtools/swagger-parser';
import { OpenAPIV3 } from 'openapi-types';
import { ApiOperation } from './types';
import { isHttpMethod, createSlug, parseMenuSegments } from './util';
import { MenuItem } from '../menu/types';

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
 * Transforms the schema into a flat array of our custom ApiOperation type.
 * This makes it a bit easier to work with when generating the content pages.
 */
export const toOperations = (schema: OpenAPIV3.Document): ApiOperation[] => {
  const operations: ApiOperation[] = [];

  for (const path in schema.paths) {
    const pathObject = schema.paths[path];
    for (const method in pathObject) {
      if (isHttpMethod(method)) {
        const operation = pathObject[method as keyof OpenAPIV3.PathItemObject] as OpenAPIV3.OperationObject;
        const menuSegments = parseMenuSegments(operation.operationId);
        const slug = createSlug(menuSegments);
        operations.push({
          ...(operation as ApiOperation),
          method: method as OpenAPIV3.HttpMethods,
          path,
          menuSegments,
          slug,
        });
      }
    }
  }

  return operations;
};

/**
 * Transforms a flat array of our custom ApiOperation type into our MenuItem type.
 * Used for generating the menus.
 */
export const toMenuItems = (operations: ApiOperation[]): MenuItem[] => {
  const items: MenuItem[] = [];

  for (const operation of operations) {
    if (operation.operationId) {
      const segments = parseMenuSegments(operation.operationId);
      let parent = items;

      for (let i = 0; i < segments.length; i++) {
        const title = segments[i];
        const isLast = i === segments.length - 1;

        let existing = parent.find((child) => child.title === title);
        if (!existing) {
          existing = { title };
          if (isLast) {
            existing.path = operation.slug;
            existing.method = operation.method;
          } else {
            existing.children = [];
          }
          parent.push(existing);
        }

        if (existing.children) {
          parent = existing.children;
        }
      }
    }
  }

  return items;
};
