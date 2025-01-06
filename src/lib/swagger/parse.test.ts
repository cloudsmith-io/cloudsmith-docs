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
        });
      });

      // TODO: Update test when we have the proper data
      describe('toMenuItems', () => {
        test('it creates menu items', async () => {
          const schema = await parseSchema();
          const operations = toOperations(schema);
          const result = toMenuItems(operations);
          expect(result[0].title).toBe('Policies');
          expect(result[0].children?.[0].title).toBe('List');
        });

        // TODO: It adds the correct method
        // TODO: It sorts things alphabetically
        // TODO: It makes the correct link
      });
    });
  });
});
