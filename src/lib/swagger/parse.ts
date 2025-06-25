import SwaggerParser from '@apidevtools/swagger-parser';
import { OpenAPIV3 } from 'openapi-types';
import { ApiOperation } from './types';
import { isHttpMethod, createSlug, parseMenuSegments, apiOperationPath, createTitle } from './util';
import { MenuItem } from '../menu/types';

/**
 * Parses a specific version of the swagger schema with the Swagger Parser library to resolve refs.
 * @param version - The API version to parse ('v2' or 'v3').
 */
export const parseSchema = async (version: 'v2' | 'v3'): Promise<OpenAPIV3.Document> => {
  // Defensive check to ensure 'version' is provided.
  if (!version) {
    throw new Error("The 'parseSchema' function was called without a 'version' parameter. Please specify 'v2' or 'v3'.");
  }

  // Assumes you have 'api-schema-v2.json' and 'api-schema-v3.json' in `src/content/schemas/`
  const schemaPath = `src/content/schemas/api-schema-${version}.json`;
  
  const schema = (await SwaggerParser.dereference(schemaPath)) as OpenAPIV3.Document;

  if (!schema) {
    throw new Error(`Failed to parse API schema for ${version}`);
  }

  return schema;
};

/**
 * Transforms the schema into a flat array of our custom ApiOperation type.
 * This makes it a bit easier to work with when generating the content pages.
 * @param schema - The OpenAPI document.
 * @param version - The API version ('v2' or 'v3') to tag each operation with.
 */
export const toOperations = (schema: OpenAPIV3.Document, version: 'v2' | 'v3'): ApiOperation[] => {
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
          title: createTitle(menuSegments),
          version, // Tag the operation with its version
        });
      }
    }
  }

  return operations;
};

/**
 * Transforms a flat array of our custom ApiOperation type into our MenuItem type.
 * Used for generating the menus. It now uses the version from each operation to create the correct path.
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
            existing.path = apiOperationPath(operation.slug, operation.version); // Pass version to generate path
            existing.method = operation.method;
          } else {
            if (!existing.path) {
              // Also set path for parent menu items to make them clickable
              existing.path = apiOperationPath(operation.slug, operation.version); // Pass version
            }
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
