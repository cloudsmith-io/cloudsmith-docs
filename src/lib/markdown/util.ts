import glob from 'fast-glob';

/**
 * Returns an array of slugs for all mdx files in src/content
 * excluding those in src/content/api
 */
export const loadMdxSlugs = async (): Promise<SlugDefinition[]> => {
  return loadSlugs(['src/content/**/*.mdx', '!src/content/api/**/*']);
};

/**
 * Returns an array of slugs for all mdx files inside src/content/api
 */
export const loadApiMdxSlugs = async (): Promise<SlugDefinition[]> => {
  const slugs = await loadSlugs(['src/content/api/**/*.mdx']);
  return slugs.map((obj) => ({ file: obj.file, slug: obj.slug.replace(/^api\//, '') }));
};

/**
 * Base helper to load the files and slugs
 */
export const loadSlugs = async (pattern: string[]): Promise<SlugDefinition[]> => {
  const entries = await glob(pattern);
  return entries.map((entry) => {
    const file = entry.replace('src/content/', '');
    const slug = file.replace('.mdx', '').replace(/\/index$/, '');
    return { file, slug };
  });
};

interface SlugDefinition {
  file: string;
  slug: string;
}
