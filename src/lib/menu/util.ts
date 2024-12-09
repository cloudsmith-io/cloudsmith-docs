import json from '../../content/menu.json';
import type { Menu, MenuItem } from './types';

const menu: Menu = json;

/**
 * Return a single top-level menu section based on the key
 */
export const getMenuData = (key: string): MenuItem => {
  if (!menu[key]) {
    throw `Menu section does not exist ${key}`;
  }

  return menu[key];
};
