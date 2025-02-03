import type { Metadata } from 'next';
import fs from 'fs/promises';
import path from 'path';
import { MetadataOptions } from './types';

/**
 * Generates default metadata for any page.
 * Used as a fallback for routes that don't map to MDX files.
 */
export const withDefaultMetadata = (options: MetadataOptions): Metadata => {
  const { defaultTitle, templatePrefix = 'Cloudsmith Docs' } = options;

  return {
    title: {
      template: `%s | ${templatePrefix}`,
      default: defaultTitle,
    },
  };
};

/**
 * Generates metadata for an MDX page, following a priority order for the title:
 * 1. Frontmatter title (if present)
 * 2. First H1 heading in the content (if present)
 * 3. Default title from options
 */
export const withMdxMetadata = async (contentPath: string, options: MetadataOptions): Promise<Metadata> => {
  const { defaultTitle, templatePrefix = 'Cloudsmith' } = options;
  const { title, description } = await extractMdxMetadata(contentPath, defaultTitle);

  return {
    title: {
      template: `%s | ${templatePrefix}`,
      default: title,
    },
    description,
  };
};

/**
 * Extracts metadata from an MDX file by reading a combination of the
 * frontmatter and the file contents. Could probably be optimized.
 */
export const extractMdxMetadata = async (
  contentPath: string,
  defaultTitle: string,
  fileContents?: string,
): Promise<{ title: string; description: string }> => {
  // Find title in frontmatter
  const mdxModule = await import(`@/content/${contentPath}`);
  const frontmatterTitle = mdxModule.frontmatter?.title;
  let title = frontmatterTitle ?? defaultTitle;

  // Find title in markdown heading
  if (!frontmatterTitle) {
    const fullPath = path.join(process.cwd(), 'src/content', contentPath);
    const content = fileContents ?? (await fs.readFile(fullPath, 'utf-8'));
    const h1Title = await extractFirstH1Title(content);
    if (h1Title) {
      title = h1Title;
    }
  }

  const description = mdxModule.frontmatter?.description;

  // Default title
  return { title, description };
};

/**
 * Extracts the first H1 heading from an MDX file:
 * 1. Reads the raw file content
 * 2. Removes any frontmatter (content between --- markers)
 * 3. Finds the first line starting with a single # and captures the text
 */
const extractFirstH1Title = (content: string): string | undefined => {
  // Skip frontmatter if present (content between --- markers)
  const contentWithoutFrontmatter = content.replace(/^---\n[\s\S]*?\n---\n/, '');

  // Find first H1 (line starting with single #)
  const h1Match = contentWithoutFrontmatter.match(/^#\s+(.+)$/m);
  if (h1Match) {
    return h1Match[1].trim();
  }

  return undefined;
};
