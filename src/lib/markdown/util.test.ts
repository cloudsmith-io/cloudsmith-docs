import { loadApiMdxSlugs, loadMdxSlugs } from './util';

describe('lib', () => {
  describe('markdown', () => {
    describe('util.ts', () => {
      describe('loadMdxSlugs', () => {
        test('it returns slugs for documentation files', async () => {
          const slugs = await loadMdxSlugs();
          expect(slugs).toEqual(
            expect.arrayContaining([
              { file: 'test/index.mdx', slug: 'test' },
              { file: 'test/another-test.mdx', slug: 'test/another-test' },
            ]),
          );
        });
        test('it returns slugs for api files', async () => {
          const slugs = await loadApiMdxSlugs();
          expect(slugs).toEqual(expect.arrayContaining([{ file: 'api/api-test.mdx', slug: 'api-test' }]));
        });
      });
    });
  });
});
