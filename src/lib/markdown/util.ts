import glob from 'fast-glob';

/**
 * Returns an array of slugs for all mdx files in src/content
 * excluding those in src/content/api
 */
export const loadMdxSlugs = async (): Promise<string[]> => {
  const entries = await glob(['src/content/**/*.mdx', '!src/content/api/**/*']);
  return entries.map((entry) => entry.replace('src/content/', '').replace('.mdx', ''));
};

/**
 * Returns an array of slugs for all mdx files inside src/content/api
 */

export const loadApiMdxSlugs = async (): Promise<string[]> => {
  const entries = await glob(['src/content/api/**/*.mdx']);
  return entries.map((entry) => entry.replace('src/content/api/', '').replace('.mdx', ''));
};
