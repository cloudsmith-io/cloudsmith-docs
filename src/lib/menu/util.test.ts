import { getActiveAncestors, getActiveMenuItem, getMenuItem } from './util';

describe('lib', () => {
  describe('menu', () => {
    describe('getActiveMenuItem()', () => {
      test('finds active top-level item', async () => {
        const active1 = getActiveMenuItem('/api/something');
        expect(active1.path).toEqual('/api');
        const active2 = getActiveMenuItem('/guides/something');
        expect(active2.path).toEqual('/guides');
        const active3 = getActiveMenuItem('/documentation/something');
        expect(active3.path).toEqual('/documentation');
        const active4 = getActiveMenuItem('/something');
        expect(active4.path).toEqual('/documentation');
      });
    });
    describe('getActiveAncestors()', () => {
      test('finds active menu item with ancestors', async () => {
        const documentationItem = getMenuItem('documentation');
        const ancestors = getActiveAncestors('/migrating-to-cloudsmith/export-from-nexus-sonatype', [
          documentationItem,
        ]);
        expect(ancestors.length).toEqual(3);
        expect(ancestors[0].title).toEqual('Documentation');
        expect(ancestors[1].title).toEqual('Migrating to Cloudsmith');
        expect(ancestors[2].title).toEqual('Export from Nexus Sonatype');
      });
    });
  });
});
