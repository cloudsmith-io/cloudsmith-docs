/**
 * Looks for all keys in an object and replaces the string with the values.
 */
export const replaceAll = (str: string, obj: { [from: string]: string }) => {
  for (const key in obj) {
    str = str.replace(new RegExp(key, 'g'), obj[key]);
  }
  return str;
};

/**
 * Capitalize the first letter of a string
 */
export const capitalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

/**
 * Title case a string
 */
export const titleCase = (str: string) => {
  return str.replace(/\w\S*/g, (text) => text.charAt(0).toUpperCase() + text.substring(1).toLowerCase());
};

/**
 * Converts a slug in style of my-resource/something to ['my-resource', 'something']
 * Used in generateStaticParams() for catch all route params in /api.
 */
export const toRouteSegments = (slug: string): string[] => {
  return slug.split('/').filter((segment) => !!segment);
};

/**
 * Turns route segments back into a slug
 */
export const toSlug = (routeSegments: string[]): string => {
  return routeSegments.join('/');
};
