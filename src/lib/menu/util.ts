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
 * Filter the menu items into two arrays, one with items that have an icon and one without
 * for easier rendering in the navbar
 */
export const getNavBarItems = () => {
  const primary: NavBarItems = [];
  const secondary: NavBarItems = [];

  Object.entries(menu).forEach(([key, item]) => {
    if (!item.path) return;

    item.icon ? primary.push([key, item]) : secondary.push([key, item]);
  });

  return { primary, secondary };
};

type NavBarItems = Array<[string, MenuItem]>;
