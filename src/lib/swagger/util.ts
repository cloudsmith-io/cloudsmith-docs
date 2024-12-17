import SwaggerParser from '@apidevtools/swagger-parser';

export async function getApiSchema() {
  const schema = await SwaggerParser.parse(`src/content/api-schema-v1.json`);

  if (!schema) {
    throw new Error('Failed to fetch API schema');
  }

  return schema;
}

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
