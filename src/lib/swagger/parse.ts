import SwaggerParser from '@apidevtools/swagger-parser';
import type { OpenAPIV3 } from 'openapi-types';

export async function parseSchema(): Promise<OpenAPIV3.Document> {
  const schema = (await SwaggerParser.parse(`src/content/api-schema-v2.json`)) as OpenAPIV3.Document;

  if (!schema) {
    throw new Error('Failed to parse API schema');
  }

  return schema;
}

// Another function to:
// Parse all paths into a flat array of custom type built on the openapi-types exported sub-types
// Parse the array into a tree object that can be used to render the menu?

// export async function getSidebarStructure() {

//   const schema = await getApiSchema();

//   if (!schema?.paths) {
//     throw new Error('No paths in API schema');
//   }

//   const flattenPaths = Object.entries(schema.paths).map(([path, pathItem]) => ({
//     ...pathItem,
//     path,
//   }));

//   const groupedByTags = Object.groupBy(flattenPaths, (item) => item.get?.tags);

//   // Parse and stringify to make Next.js caching happy.
//   // There might be a better fix for this, since we might not need all the data
//   // https://nextjs.org/docs/canary/app/api-reference/directives/use-cache#good-to-know
//   return JSON.parse(JSON.stringify(groupedByTags)) as object;
// }
