import SwaggerParser from '@apidevtools/swagger-parser';
import { unstable_cacheLife as cacheLife } from 'next/cache';

import generatedSchema from '../generated/api-schema.json';

const isDevelopment = process.env.NODE_ENV === 'development';

export async function getApiSchema() {
  'use cache';
  cacheLife('days');

  // In development mode use the generated schema to avoid fetching to have faster compile times
  const schema = isDevelopment ? generatedSchema : await SwaggerParser.parse(process.env.CLOUDSMITH_API_URL!);

  if (!schema) {
    throw new Error('Failed to fetch API schema');
  }

  return schema;
}

export async function getSidebarStructure() {
  'use cache';
  cacheLife('hours');

  const schema = await getApiSchema();

  if (!schema?.paths) {
    throw new Error('No paths in API schema');
  }

  return Object.entries(schema.paths).map(([path, pathItem]) => {
    const items = Object.entries(pathItem).map(([method, operation]) => ({
      name: operation.summary,
      path: path,
      method: method,
    }));

    return {
      name: path,
      items,
    };
  });
}
