import json from '../../content/menu.json';
import type { Menu, MenuItem } from './types';

const menu: Menu = json;

/**
 * Return a single top-level menu item based on the key
 */
export const getMenuItem = (key: string): MenuItem => {
  return menu[key];
};
