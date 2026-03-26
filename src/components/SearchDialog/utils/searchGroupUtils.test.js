import {
  buildSearchGroups,
  CLOUDSMITH_WEBSITE_GROUP_TYPE,
  getSearchGroupType,
  GUIDES_GROUP_TYPE,
  RECOMMENDED_GROUP_TYPE,
  sortSearchGroupsForFilters,
} from './searchGroupUtils';

describe('searchGroupUtils', () => {
  test('groups website hits under the Cloudsmith website category', () => {
    const hit = {
      __searchSource: 'website',
      _type: 'productPage',
      slug: 'https://cloudsmith.com/product',
    };

    expect(getSearchGroupType(hit)).toBe(CLOUDSMITH_WEBSITE_GROUP_TYPE);
  });

  test('classifies docs hits by docs route', () => {
    expect(
      getSearchGroupType({
        __searchSource: 'docs',
        _type: 'page',
        slug: '/api/packages/list',
      }),
    ).toBe('apiReference');

    expect(
      getSearchGroupType({
        __searchSource: 'docs',
        _type: 'page',
        slug: '/guides/migrating',
      }),
    ).toBe(GUIDES_GROUP_TYPE);

    expect(
      getSearchGroupType({
        __searchSource: 'docs',
        _type: 'page',
        slug: '/workspaces/overview',
      }),
    ).toBe('documentation');
  });

  test('builds grouped search sections using source-aware categories', () => {
    const groups = buildSearchGroups([
      {
        __searchSource: 'website',
        _type: 'productPage',
        slug: 'https://cloudsmith.com/product',
      },
      {
        __searchSource: 'docs',
        _type: 'page',
        slug: '/api/packages/list',
      },
      {
        __searchSource: 'docs',
        _type: 'page',
        slug: '/guides/migrating',
      },
      {
        __searchSource: 'docs',
        _type: 'page',
        slug: '/workspaces/overview',
      },
    ]);

    expect(groups.map((group) => group._type)).toEqual([
      RECOMMENDED_GROUP_TYPE,
      'apiReference',
      CLOUDSMITH_WEBSITE_GROUP_TYPE,
      'documentation',
      GUIDES_GROUP_TYPE,
    ]);
  });

  test('sorts left-hand filter groups using the configured filter order', () => {
    const groups = sortSearchGroupsForFilters([
      {
        _type: RECOMMENDED_GROUP_TYPE,
        label: 'Recommended',
      },
      {
        _type: CLOUDSMITH_WEBSITE_GROUP_TYPE,
        label: 'Cloudsmith website',
      },
      {
        _type: 'documentation',
        label: 'Documentation',
      },
      {
        _type: 'apiReference',
        label: 'API Reference',
      },
    ]);

    expect(groups.map((group) => group._type)).toEqual([
      RECOMMENDED_GROUP_TYPE,
      'apiReference',
      'documentation',
      CLOUDSMITH_WEBSITE_GROUP_TYPE,
    ]);
  });
});
