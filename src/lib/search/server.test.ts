import { performSearch } from './server';

describe('lib', () => {
  describe('search', () => {
    describe('search()', () => {
      test('searches content', async () => {
        const result = await performSearch('download logs');
        expect(result).toEqual('something');
      });
    });
  });
});
