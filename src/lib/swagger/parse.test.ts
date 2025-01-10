import { parseSchema, toMenuItems, toOperations } from './parse';

describe('lib', () => {
  describe('swagger', () => {
    describe('parse.ts', () => {
      describe('parseSchema', () => {
        test('it parses the schema', async () => {
          const schema = await parseSchema();
          expect(schema.openapi).toBe('3.0.3');
          expect(schema.info.title).toBe('Cloudsmith API');
          expect(Object.keys(schema.paths).length).toBeGreaterThan(4);
        });
      });

      // TODO: Update test when we have the proper data
      describe('toOperations', () => {
        test('it creates flat array of operation objects', async () => {
          const schema = await parseSchema();
          const result = toOperations(schema);
          expect(result.length).toBeGreaterThan(4);

          const operation = result.find((op) => op.operationId === 'orgs_policies_list');
          expect(operation).toBeDefined();
          expect(operation?.menuSegments).toEqual(['Policies', 'List']);
          expect(operation?.path).toEqual('/orgs/{org}/policies/');
          expect(operation?.method).toEqual('get');
          expect(operation?.slug).toEqual('policies/list');
        });
      });

      // TODO: Update test when we have the proper data
      describe('toMenuItems', () => {
        test('it creates menu items', async () => {
          const schema = await parseSchema();
          const operations = toOperations(schema);
          const result = toMenuItems(operations);

          const parentItem = result[0];
          const childItem = parentItem.children?.[0];

          expect(parentItem.title).toBe('Policies');
          expect(parentItem?.path).toBeUndefined();
          expect(parentItem?.method).toBeUndefined();

          expect(childItem?.title).toEqual('List');
          expect(childItem?.method).toEqual('get');
          expect(childItem?.path).toEqual('/api/policies/list');
        });
      });
    });
  });
});
