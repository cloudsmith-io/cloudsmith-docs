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
