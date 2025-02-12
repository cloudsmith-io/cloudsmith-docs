import { loadMdxInfo } from './util';

describe('lib', () => {
  describe('markdown', () => {
    describe('util.ts', () => {
      describe('loadMdxInfo', () => {
        test('it returns slugs for documentation files', async () => {
          const info = await loadMdxInfo();
          expect(info.length).toBeGreaterThan(20);
          expect(info.some((i) => i.slug.startsWith('api/') || i.slug.startsWith('guides/')));
        });

        test('it returns slugs for guides files', async () => {
          const info = await loadMdxInfo('guides');
          expect(info.length).toBeGreaterThan(0);
          expect(info.every((i) => i.slug.startsWith('guides/')));
        });

        test('it returns slugs for api files', async () => {
          const info = await loadMdxInfo('api');
          expect(info.length).toBeGreaterThan(0);
          expect(info.every((i) => i.slug.startsWith('api/')));
        });

        test('it returns the correct object', async () => {
          const info = await loadMdxInfo();
          const first = info[0];

          expect(typeof first.file).toEqual('string');
          expect(first.file.endsWith('.mdx')).toBe(true);
          expect(typeof first.slug).toEqual('string');
          expect(Array.isArray(first.segments)).toBe(true);
        });
      });
    });
  });
});
