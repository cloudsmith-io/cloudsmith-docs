import { loadMdxSlugs } from './util';

describe('lib', () => {
  describe('markdown', () => {
    describe('util.ts', () => {
      describe('loadMdxSlugs', () => {
        test('it returns slugs for documentation files', async () => {
          const slugs = await loadMdxSlugs();
          expect(slugs).toEqual(['test']);
        });
        test('it returns slugs for api files', async () => {
          const slugs = await loadMdxSlugs(true);
          expect(slugs).toEqual(['api/test']);
        });
      });
    });
  });
});
