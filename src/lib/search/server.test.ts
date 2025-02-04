import { performSearch } from './server';

describe('lib', () => {
  describe('search', () => {
    describe('search()', () => {
      test('searches content across all sections', async () => {
        const results = await performSearch('download logs');
        expect(results.length).toBeGreaterThan(2);
        expect(results[0].path).toEqual('/api/analytics/metrics/download/list');
        // This will not test MDX frontmatter because of Jest mock
        expect(results[0].title).toEqual('Missing headline for endpoint');
        expect(results[0].section).toEqual('api');
        expect(results[0].score).toEqual(1);
        expect(results[1].path).toEqual('/developer-community');
        expect(results[1].title).toEqual('Developer Community');
        expect(results[1].score).toEqual(1);
        expect(results[1].section).toEqual('documentation');
      });

      test('searches only documentation', async () => {
        const results = await performSearch('download logs', ['documentation']);
        expect(results[0].path).toEqual('/developer-community');
        // This will not test MDX frontmatter because of Jest mock
        expect(results[0].title).toEqual('Developer Community');
        expect(results[0].score).toEqual(1);
        expect(results[0].section).toEqual('documentation');
      });

      test('searches only api', async () => {
        const results = await performSearch('download logs', ['api']);
        expect(results[0].path).toEqual('/api/analytics/metrics/download/list');
        // This will not test MDX frontmatter because of Jest mock
        expect(results[0].title).toEqual('Missing headline for endpoint');
        expect(results[0].section).toEqual('api');
        expect(results[0].score).toEqual(1);
      });
    });
  });
});
