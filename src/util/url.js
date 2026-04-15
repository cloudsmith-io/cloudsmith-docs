/**
 * Joins fragments of a path together, ensuring there is a single slash between each fragment.
 * Optionally also ensures there is a trailing slash.
 */
export const joinPathsFactory =
  (base) =>
  (path = '', trailingSlash = false) => {
    const inputPaths = [base, path].filter(Boolean);
    const joined = `${inputPaths.join('/')}${trailingSlash ? '/' : ''}`;
    return joined.replace(/([^:]\/)\/+/g, '$1');
  };

//  Checks if a href should be treated as an external resource.
export const isExternalHref = (_href) => {
  const href = (_href && _href.pathname) ?? _href ?? null;

  if (!href) return false;
  if (!/^https?:\/\//i.test(href)) return false;

  try {
    new URL(href);
    return true;
  } catch {
    return false;
  }
};
