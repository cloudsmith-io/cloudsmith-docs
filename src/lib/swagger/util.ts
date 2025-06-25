import { OpenAPIV3 } from 'openapi-types';
import { replaceAll, titleCase } from '../util';

export const isHttpMethod = (method: string): boolean =>
  Object.values<string>(OpenAPIV3.HttpMethods).includes(method);

/**
 * Parses the operationId property to create the menu structure
 * for the API reference. Needs special handling for some values.
 */
export const parseMenuSegments = (operationId: string | undefined): string[] => {
  if (!operationId) {
    return [];
  }

  const replaced = replaceAll(operationId, {
    partial_update: 'partial-update',
  });

  const split = replaced.split('_').map((keyword) => titleCase(keyword.replaceAll('-', ' ')));

  // Special handling to remove certain words at the beginning of the menu.
  // This is needed because most identifiers are wrapped in "Orgs", etc.
  const unwrap = ['Orgs'];
  if (split.length > 2 && unwrap.includes(split[0])) {
    split.shift();
  }

  return split;
};

/**
 * Turns the menu segments into a single slugified path
 */
export const createSlug = (menuSegments: string[]): string => {
  return menuSegments.join('/').replaceAll(' ', '-').toLowerCase();
};

/**
 * Turns the menu segments into a single title for the operation page.
 */
export const createTitle = (menuSegments: string[]): string => {
  return menuSegments.join(' ');
};

/**
 * Turns an operation slug into a fully qualified local path to use in links.
 * Now includes the version.
 */
export const apiOperationPath = (slug: string, version: 'v2' | 'v3'): string => {
  return `/api/${version}/${slug}`;
};
