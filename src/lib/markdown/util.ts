import glob from 'fast-glob';
import { toRouteSegments } from '../util';

/**
 * Returns info for mdx files within a certain section
 */
export const loadMdxInfo = async (
  section: 'documentation' | 'guides' | 'api' = 'documentation',
): Promise<SlugDefinition[]> => {
  if (section === 'documentation') {
    return load(['src/content/**/*.mdx', '!src/content/api/**/*', '!src/content/guides/**/*']);
  }

  if (section === 'guides') {
    return load(['src/content/guides/**/*.mdx'], /^guides\/?/);
  }

  if (section === 'api') {
    return load(['src/content/api/**/*.mdx'], /^api\/?/);
  }

  throw 'Wrong section set';
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
