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
  cacheLife('minutes');

  const schema = await getApiSchema();

  if (!schema?.paths) {
    throw new Error('No paths in API schema');
  }

  const flattenPaths = Object.entries(schema.paths).map(([path, pathItem]) => ({
    ...pathItem,
    path,
  }));

  const groupedByTags = Object.groupBy(flattenPaths, (item) => item.get?.tags);

  // Parse and stringify to make Next.js caching happy.
  // There might be a better fix for this, since we might not need all the data
  // https://nextjs.org/docs/canary/app/api-reference/directives/use-cache#good-to-know
  return JSON.parse(JSON.stringify(groupedByTags)) as any;
}
