import { performSearch } from './server';

describe('lib', () => {
  describe('search', () => {
    describe('search()', () => {
      test('searches content across all sections', async () => {
        const results = await performSearch('Formats');
        expect(results.length).toBeGreaterThan(20);

        const mdx = results.find((res) => res.path === '/supported-formats');
        const api = results.find((res) => res.path === '/api/formats/read');

        expect(mdx).toBeDefined();
        expect(api).toBeDefined();

        expect(mdx?.score).toEqual(1);
        expect(api?.score).toEqual(0.8571428571428572);
      });

      test('searches only documentation', async () => {
        const results = await performSearch('Developer Community', ['documentation']);
        expect(results[0].path).toEqual('/developer-community');
        // This will not test MDX frontmatter because of Jest mock
        expect(results[0].title).toEqual('Developer Community');
        expect(results[0].score).toEqual(1);
        expect(results[0].section).toEqual('documentation');
      });

      test('searches only api', async () => {
        const results = await performSearch('Lists audit log entries for a specific namespace', ['api']);
        expect(results[0].path).toEqual('/api/audit/log/namespace/list');
        // This will not test MDX frontmatter because of Jest mock
        expect(results[0].title).toEqual('Missing headline for endpoint');
        expect(results[0].section).toEqual('api');
        expect(results[0].score).toEqual(1);
      });
    });
  });
});
