import type { Menu, MenuItem } from './types';

import json from '../../content/menu.json';

const menu: Menu = json as Menu;

/**
 * Return a single top-level menu section based on the key
 */
export const getMenuItem = (key: string): MenuItem => {
  if (!menu[key]) {
    throw `Menu section does not exist ${key}`;
  }

  return menu[key];
};

/**
 * Return multiple top-level menu sections based on the key
 */
export const getMenuItems = (keys: string[]): MenuItem[] => {
  return keys.map((key) => getMenuItem(key));
};

/**
 * Finds the active top-level menu item based on the pathname
 */
export const getActiveMenuItem = (pathname: string): MenuItem => {
  for (const key in menu) {
    const item = menu[key];
    if (item.path && pathname.startsWith(item.path)) {
      return item;
    }
  }

  return menu.documentation;
};

/**
 * Finds the active nested menu item and its ancestors by comparing
 * the pathname to its .path property. Returns an array of
 * all the menu items where the active item is last and
 * the most top-level ancestor is first.
 */
export const getActiveAncestors = (
  pathname: string,
  items: MenuItem[],
  ancestors: MenuItem[] = [],
): MenuItem[] => {
  for (const item of items) {
    // If this item has the exact pathname
    if (item.path === pathname) {
      return ancestors.concat([item]);
    }

    // Otherwise look for exact pathname in its children
    if (item.children) {
      const newAncestors = getActiveAncestors(pathname, item.children, ancestors.concat([item]));
      if (newAncestors.length > ancestors.length) {
        return newAncestors;
      }
    }
  }

  return [];
};
