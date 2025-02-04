import { performSearch } from './server';

describe('lib', () => {
  describe('search', () => {
    describe('search()', () => {
      test('searches content across all sections', async () => {
        const results = await performSearch('download logs');
        expect(results.length).toBeGreaterThan(2);
        expect(results[0].path).toEqual('/api/analytics/metrics/download/list');
        expect(results[0].section).toEqual('api');
        expect(results[0].score).toEqual(1);
        expect(results[1].path).toEqual('/developer-community');
        expect(results[1].score).toEqual(1);
        expect(results[1].section).toEqual('documentation');
      });

      test('searches only documentation', async () => {
        const results = await performSearch('download logs', ['documentation']);
        expect(results[0].path).toEqual('/developer-community');
        expect(results[0].score).toEqual(1);
        expect(results[0].section).toEqual('documentation');
      });

      test('searches only api', async () => {
        const results = await performSearch('download logs', ['api']);
        expect(results[0].path).toEqual('/api/analytics/metrics/download/list');
        expect(results[0].section).toEqual('api');
        expect(results[0].score).toEqual(1);
      });
    });
  });
});
