export const pluralize = (singular, plural, count = 0) => {
  if (count === 1) return singular;
  return plural;
};

export const truncate = (text, count = 100, overflow = '…') => {
  const words = text.split(' ');
  if (words.length < count) return words.join(' ');
  return `${words.slice(0, count).join(' ')}${overflow}`;
};

export const capitalize = (str) =>
  `${str.charAt(0).toUpperCase()}${str.slice(1)}`;

export const camelToWordCase = (str) =>
  str.replace(
    /[A-Z]+(?![a-z])|[A-Z]/g,
    ($, ofs) => (ofs ? ' ' : '') + $.toLowerCase(),
  );

export const maybeString = (str) => {
  if (str === undefined || str === null) return null;
  return `${str}`;
};

export const cleanTitle = (str) => {
  return str.replace('<strong>', '').replace('</strong>', '');
};

export const slugify = (value) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');

export const titleCase = (value) =>
  value
    .split(/[\s_-]+/)
    .filter(Boolean)
    .map((word) => word.replace(/([A-Z])/g, ' $1'))
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
