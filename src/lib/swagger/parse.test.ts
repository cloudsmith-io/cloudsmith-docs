import { parseSchema, transformSchema } from './parse';

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

      describe('transformSchema', () => {
        test('it creates flat array of operation objects', async () => {
          const schema = await parseSchema();
          const result = await transformSchema(schema);
          expect(result.operations.length).toBeGreaterThan(4);
        });

        test('it creates menu tree pointing to operation objects', async () => {
          const schema = await parseSchema();
          const result = await transformSchema(schema);
          // TODO: Update test when we have the proper data
          expect(result.menu[0].name).toBe('Policies');
          expect(result.menu[0].children[0].name).toBe('List');
        });
      });
    });
  });
});
