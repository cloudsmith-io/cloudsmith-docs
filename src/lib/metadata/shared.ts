import type { Metadata } from 'next';
import fs from 'fs/promises';
import path from 'path';

/**
 * Extracts the first H1 heading from an MDX file:
 * 1. Reads the raw file content
 * 2. Removes any frontmatter (content between --- markers)
 * 3. Finds the first line starting with a single # and captures the text
 *
 * @param filePath - Relative path to the MDX file in src/content
 * @returns The text content of the first H1 heading, or undefined if not found
 */
async function extractFirstH1Title(filePath?: string): Promise<string | undefined> {
  if (!filePath) return undefined;

  try {
    const fullPath = path.join(process.cwd(), 'src/content', filePath);
    const content = await fs.readFile(fullPath, 'utf-8');

    // Skip frontmatter if present (content between --- markers)
    const contentWithoutFrontmatter = content.replace(/^---\n[\s\S]*?\n---\n/, '');

    // Find first H1 (line starting with single #)
    const h1Match = contentWithoutFrontmatter.match(/^#\s+(.+)$/m);
    if (h1Match) {
      return h1Match[1].trim();
    }
  } catch (error) {
    console.error('Error reading MDX file:', error);
  }

  return undefined;
}

/**
 * Generates metadata for an MDX page, following a priority order for the title:
 * 1. Frontmatter title (if present)
 * 2. First H1 heading in the content (if present)
 * 3. Default title from options
 *
 * @param mdxModule - The imported MDX module with frontmatter
 * @param options - Configuration options including default title and template prefix
 * @returns Next.js Metadata object with title and description
 */
export async function generateSharedMetadata(
  mdxModule: MdxModule,
  options: MetadataOptions,
): Promise<Metadata> {
  const { defaultTitle, templatePrefix = 'Cloudsmith', filePath } = options;

  // Get title following priority order
  const frontmatterTitle = mdxModule.frontmatter?.title;
  const h1Title = await extractFirstH1Title(filePath);
  const contentTitle = frontmatterTitle || h1Title || defaultTitle;

  return {
    title: {
      template: `%s | ${templatePrefix} Docs`,
      default: contentTitle,
    },
    description: mdxModule.frontmatter?.description,
  };
}

/**
 * Generates default metadata when no MDX content is available.
 * Used as a fallback for routes that don't map to MDX files.
 *
 * @param options - Configuration options including default title and template prefix
 * @returns Next.js Metadata object with default title
 */
export function generateDefaultMetadata(options: MetadataOptions): Metadata {
  const { defaultTitle, templatePrefix = 'Cloudsmith' } = options;

  return {
    title: {
      template: `%s | ${templatePrefix} Docs`,
      default: defaultTitle,
    },
  };
}

interface MdxModule {
  frontmatter?: {
    title?: string;
    description?: string;
  };

  default?: {
    type?: string;
    props?: {
      children?: Array<{
        type: string;
        props?: {
          children?: string;
        };
      }>;
    };
  };
  rawContent?: string;
}

interface MetadataOptions {
  defaultTitle: string;
  templatePrefix?: string;
  filePath?: string;
}
