import { parseSchema } from './parse';

describe('lib', () => {
  describe('swagger', () => {
    describe('parse.ts', () => {
      describe('parseSchema', () => {
        test('it parses the schema', async () => {
          const schema = await parseSchema();
          expect(schema.openapi).toBe('3.0.3');
          expect(schema.info.title).toBe('Cloudsmith API');
          // TODO: Change when full doc is added
          expect(Object.keys(schema.paths).length).toBeGreaterThan(4);
        });
      });
    });
  });
});
