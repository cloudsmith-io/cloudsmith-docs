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

/**
 * Throttle a function to only run at most once every `wait` milliseconds.
 */
export const throttle = <T extends unknown[]>(func: (...args: T) => void, wait: number) => {
  let timeout: ReturnType<typeof setTimeout> | null;
  return function (...args: T) {
    if (!timeout) {
      timeout = setTimeout(() => {
        func(...args);
        timeout = null;
      }, wait);
    }
  };
};

/**
 * Debounce a function to only run after `wait` milliseconds of the last call
 */
export const debounce = <T extends unknown[]>(func: (...args: T) => void, wait: number) => {
  let timeout: ReturnType<typeof setTimeout> | null;
  return function (...args: T) {
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = timeout = setTimeout(() => {
      func(...args);
      timeout = null;
    }, wait);
  };
};

/**
 * Return the last item in an array or nothing
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const last = (arr: any[]) => {
  return Array.isArray(arr) && arr.length > 0 ? arr[arr.length - 1] : undefined;
};
