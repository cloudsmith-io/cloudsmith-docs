import SwaggerParser from '@apidevtools/swagger-parser';

export async function getApiSchema() {
  const apiUrl = process.env.CLOUDSMITH_API_URL!;
  const schema = await SwaggerParser.parse(apiUrl);

  if (!schema) {
    throw new Error('Failed to fetch API schema');
  }

  return schema;
}

export async function getSidebarStructure() {
  const schema = await getApiSchema();

  if (!schema?.paths) {
    throw new Error('No paths in API schema');
  }

  return Object.entries(schema.paths).map(([path, pathItem]: [string, any]) => {
    const items = Object.entries(pathItem).map(([method, operation]: [string, any]) => ({
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
