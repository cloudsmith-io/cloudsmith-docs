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

    if (item.icon) {
      primary.push([key, item]);
    } else {
      secondary.push([key, item]);
    }
  });

  return { primary, secondary };
};

/**
 * Check if a pathname matches any item in the navigation
 * Returns the matched item or undefined if no match
 */
export const getActiveItem = (pathname: string, items: NavBarItems) => {
  return items.find(([, item]) => isItemActive(item, pathname));
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

type NavBarItems = Array<[string, MenuItem]>;
