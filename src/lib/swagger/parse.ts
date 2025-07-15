import SwaggerParser from '@apidevtools/swagger-parser';
import { OpenAPIV3 } from 'openapi-types';
import { readdir, readFile } from 'fs/promises';
import path from 'path';
import { ApiOperation } from './types';
import { isHttpMethod, createSlug, parseMenuSegments, apiOperationPath, createTitle } from './util';
import { MenuItem } from '../menu/types';

const SCHEMAS_DIR = 'src/content/schemas';

/**
 * Dynamically parses all swagger schema files in the schemas directory and returns them as an array
 */
export const parseSchemas = async (): Promise<{ schema: OpenAPIV3.Document; version: string }[]> => {
  try {
    // Read all files in the schemas directory
    const files = await readdir(SCHEMAS_DIR);
    const jsonFiles = files.filter((file) => file.endsWith('.json'));

    if (jsonFiles.length === 0) {
      throw new Error(`No JSON schema files found in ${SCHEMAS_DIR}`);
    }

    const schemas: { schema: OpenAPIV3.Document; version: string }[] = [];

    for (const file of jsonFiles) {
      const filePath = path.join(SCHEMAS_DIR, file);
      try {
        // First, read the file to extract versionAlias
        const fileContent = await readFile(filePath, 'utf-8');
        const rawSchema = JSON.parse(fileContent);

        const versionAlias = rawSchema?.info?.versionAlias;
        if (!versionAlias) {
          console.warn(`Warning: No versionAlias found in ${file}, skipping`);
          continue;
        }

        // Parse and dereference the schema
        const schema = (await SwaggerParser.dereference(filePath)) as OpenAPIV3.Document;

        schemas.push({
          schema,
          version: versionAlias,
        });

        console.log(`✓ Loaded schema: ${file} (version: ${versionAlias})`);
      } catch (error) {
        console.error(`Error processing ${file}:`, error);
        throw new Error(`Failed to parse schema file: ${file}`);
      }
    }

    if (schemas.length === 0) {
      throw new Error('No valid schemas with versionAlias found');
    }

    // Sort schemas by version for consistent ordering
    schemas.sort((a, b) => a.version.localeCompare(b.version));

    return schemas;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to parse API schemas: ${error.message}`);
    }
    throw new Error('Failed to parse API schemas');
  }
};

/**
 * Transforms multiple schemas into a flat array of our custom ApiOperation type.
 * This makes it a bit easier to work with when generating the content pages.
 * Adds version information and checks for duplicate endpoints.
 */
export const toOperations = (schemas: { schema: OpenAPIV3.Document; version: string }[]): ApiOperation[] => {
  const operations: ApiOperation[] = [];
  const pathMethodTracker = new Map<string, string>(); // Track path+method combinations and their versions

  for (const { schema, version } of schemas) {
    for (const path in schema.paths) {
      const pathObject = schema.paths[path];
      for (const method in pathObject) {
        if (isHttpMethod(method)) {
          const pathMethodKey = `${method.toUpperCase()} ${path}`;

          if (pathMethodTracker.has(pathMethodKey)) {
            const existingVersion = pathMethodTracker.get(pathMethodKey);
            throw new Error(
              `Duplicate API endpoint detected: ${pathMethodKey}\n` +
                `This endpoint exists in both ${existingVersion} and ${version} schemas.\n` +
                `Please ensure each endpoint exists in only one API version.`,
            );
          }

          pathMethodTracker.set(pathMethodKey, version);

          const operation = pathObject[method as keyof OpenAPIV3.PathItemObject] as OpenAPIV3.OperationObject;
          const menuSegments = parseMenuSegments(operation.operationId);
          const slug = createSlug(menuSegments);

          const cleanPath = path.replace(/\/$/, '');

          operations.push({
            ...(operation as ApiOperation),
            method: method as OpenAPIV3.HttpMethods,
            path: cleanPath,
            version,
            menuSegments,
            slug,
            title: createTitle(menuSegments),
            experimental: (operation as OpenAPIV3.OperationObject)['x-experimental'] === true,
          });
        }
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
            existing.path = apiOperationPath(operation.slug);
            existing.method = operation.method;
          } else {
            if (!existing.path) {
              existing.path = apiOperationPath(operation.slug);
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

  /**
   * Recursively flatten any menu chains that only contain a single child.
   * This is used to simplify the menu structure and make it more readable.
   */
  const flattenMenuItems = (menuItems: MenuItem[]): MenuItem[] => {
    return menuItems.map((item) => {
      const children = item.children ? flattenMenuItems(item.children) : undefined;

      let flattenedItem: MenuItem = { ...item, children };

      while (flattenedItem.children && flattenedItem.children.length === 1) {
        const [onlyChild] = flattenedItem.children;

        flattenedItem = {
          title: `${flattenedItem.title} ${onlyChild.title}`.trim(),
          path: onlyChild.path ?? flattenedItem.path,
          method: onlyChild.method ?? flattenedItem.method,
          children: onlyChild.children,
        };

        if (flattenedItem.children) {
          flattenedItem.children = flattenMenuItems(flattenedItem.children);
        }
      }

      return flattenedItem;
    });
  };

  return flattenMenuItems(items);
};
