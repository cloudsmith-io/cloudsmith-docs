import type { Menu, MenuItem } from './types';

import json from '../../content/menu.json';

const menu: Menu = json as Menu;

/**
 * Return a single top-level menu section based on the key
 */
export const getMenuData = (key: string): MenuItem => {
  if (!menu[key]) {
    throw `Menu section does not exist ${key}`;
  }

  return menu[key];
};
