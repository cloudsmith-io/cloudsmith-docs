import { loadApiContentInfo, loadContentInfo } from './util';

describe('lib', () => {
  describe('markdown', () => {
    describe('util.ts', () => {
      describe('loadContentInfo', () => {
        test('it returns slugs for documentation files', async () => {
          const slugs = await loadContentInfo();
          expect(slugs.length).toBeGreaterThan(20);
          expect(slugs).toEqual(
            expect.arrayContaining([
              {
                file: 'getting-started/api-key.mdx',
                slug: 'getting-started/api-key',
                segments: ['getting-started', 'api-key'],
              },
            ]),
          );
        });
        test('it returns slugs for api files', async () => {
          const slugs = await loadApiContentInfo();
          expect(slugs).toEqual(
            expect.arrayContaining([
              {
                file: 'api/api-test.mdx',
                slug: 'api-test',
                segments: ['api-test'],
              },
              {
                file: 'api/index.mdx',
                slug: '',
                segments: [],
              },
            ]),
          );
        });
      });
    });
  });
});
