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
 * Return the top-level menu items that should be displayed in the navbar
 * and have a path and icon defined
 */
export const getNavBarItems = () => {
  return Object.entries(menu).filter(([_, item]) => item.icon && item.path);
};
