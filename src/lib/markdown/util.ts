import glob from 'fast-glob';

/**
 * Returns an array of all the mdx files in the content folder
 * @param isApi If false, returns all mdx files except in content/api. If true, returns only the mdx files in content/api.
 */
export const loadMdxSlugs = async (isApi: boolean = false) => {
  const pattern = isApi ? ['src/content/api/**/*.mdx'] : ['src/content/**/*.mdx', '!src/content/api/**/*'];
  const entries = await glob(pattern);
  return entries.map((entry) => entry.replace('src/content/', '').replace('.mdx', ''));
};
