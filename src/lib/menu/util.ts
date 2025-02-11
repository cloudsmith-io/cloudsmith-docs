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
 * Check if a pathname matches any item in the navigation
 * Returns the matched item or undefined if no match
 */
export const getActiveItem = (pathname: string, items: MenuItem[]) => {
  return items.find((item) => isItemActive(item, pathname));
};

const isItemActive = (item: MenuItem, pathname: string): boolean => {
  if (item.path === pathname) return true;

  if (item.children) {
    const hasActiveChild = item.children.some((child) => isItemActive(child, pathname));
    if (hasActiveChild) return true;
  }

  // If no exact match and no active children, check if pathname starts with item.path
  // since we might match the api endpoints
  return item.path ? pathname.startsWith(item.path) : false;
};
