import { toRouteSegments, toSlug } from './util';

describe('lib', () => {
  describe('util.ts', () => {
    describe('toRouteSegments', () => {
      test('create route segments', async () => {
        const segments = toRouteSegments('my-operation/list');
        expect(segments).toEqual(['my-operation', 'list']);
      });
    });
    describe('createSlug', () => {
      test('create slug', async () => {
        expect(toSlug(['my-operation', 'list'])).toEqual('my-operation/list');
      });
    });
  });
});
