import glob from 'fast-glob';
import { toRouteSegments } from '../util';

/**
 * Returns info for all mdx files in src/content
 * excluding those in src/content/api
 */
export const loadContentInfo = async (): Promise<SlugDefinition[]> => {
  return load(['src/content/**/*.mdx', '!src/content/api/**/*']);
};

/**
 * Returns info for all mdx files inside src/content/api
 */
export const loadApiContentInfo = async (): Promise<SlugDefinition[]> => {
  return load(['src/content/api/**/*.mdx'], /^api\/?/);
};

/**
 * Base helper to load the files and slugs
 */
export const load = async (pattern: string[], slugReplace?: RegExp): Promise<SlugDefinition[]> => {
  const entries = await glob(pattern);
  return entries.map((entry) => {
    const file = entry.replace('src/content/', '');
    let slug = file.replace('.mdx', '').replace(/\/index$/, '');
    if (slugReplace) {
      slug = slug.replace(slugReplace, '');
    }
    const segments = toRouteSegments(slug);
    return { file, slug, segments };
  });
};

/**
 * Simple wrapper to turn a markdown slug into a fully qualified path.
 * Which right now just means adding a '/' at the beginning.
 */
export const contentPath = (slug: string): string => `/${slug}`;

interface SlugDefinition {
  file: string;
  slug: string;
  segments: string[];
}
