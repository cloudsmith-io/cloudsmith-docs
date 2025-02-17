import { OpenAPIV3 } from 'openapi-types';
import { parseSchema, toMenuItems, toOperations } from './parse';

describe('lib', () => {
  describe('swagger', () => {
    describe('parse.ts', () => {
      describe('parseSchema', () => {
        test('it parses the schema', async () => {
          const schema = await parseSchema();
          expect(schema.openapi).toBe('3.0.0');
          expect(Object.keys(schema.paths).length).toBeGreaterThan(20);
        });
        test('it resolves refs', async () => {
          const schema = await parseSchema();
          const responseObject = schema?.paths['/orgs']?.get?.responses['400'] as OpenAPIV3.ResponseObject;
          const schemaObject = responseObject?.content?.['application/json']
            ?.schema as OpenAPIV3.SchemaObject;
          expect(schemaObject.type).toEqual('object');
        });
      });

      // TODO: Update test when we have the proper data
      describe('toOperations', () => {
        test('it creates flat array of operation objects', async () => {
          const schema = await parseSchema();
          const result = toOperations(schema);
          expect(result.length).toBeGreaterThan(4);

          const operation = result.find((op) => op.operationId === 'orgs_list');
          expect(operation).toBeDefined();
          expect(operation?.menuSegments).toEqual(['Orgs', 'List']);
          expect(operation?.path).toEqual('/orgs');
          expect(operation?.method).toEqual('get');
          expect(operation?.slug).toEqual('orgs/list');
          expect(operation?.title).toEqual('Orgs List');
        });
      });

      // TODO: Update test when we have the proper data
      describe('toMenuItems', () => {
        test('it creates menu items', async () => {
          const schema = await parseSchema();
          const operations = toOperations(schema);
          const result = toMenuItems(operations);

          const parentItem = result.find((res) => res.title === 'Formats');
          const childItem = parentItem?.children?.[0];

          expect(parentItem?.title).toBe('Formats');
          expect(parentItem?.path).toEqual('/api/formats/list'); // Parents always link to the first item
          expect(parentItem?.method).toBeUndefined();

          expect(childItem?.title).toEqual('List');
          expect(childItem?.method).toEqual('get');
          expect(childItem?.path).toEqual('/api/formats/list');
        });
      });
    });
  });
});
