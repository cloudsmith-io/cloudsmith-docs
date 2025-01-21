import type { Metadata } from 'next';

interface MdxModule {
  frontmatter?: {
    title?: string;
    description?: string;
  };
}

interface MetadataOptions {
  defaultTitle: string;
  templatePrefix?: string;
}

export async function generateSharedMetadata(
  mdxModule: MdxModule,
  options: MetadataOptions,
): Promise<Metadata> {
  const { defaultTitle, templatePrefix = 'Cloudsmith' } = options;

  // Get title from frontmatter
  const frontmatterTitle = mdxModule.frontmatter?.title;

  // If no frontmatter title, use the default title
  const contentTitle = frontmatterTitle || defaultTitle;

  return {
    title: {
      template: `%s | ${templatePrefix} Docs`,
      default: contentTitle,
    },
    description: mdxModule.frontmatter?.description,
  };
}

export function generateDefaultMetadata(options: MetadataOptions): Metadata {
  const { defaultTitle, templatePrefix = 'Cloudsmith' } = options;

  return {
    title: {
      template: `%s | ${templatePrefix} Docs`,
      default: defaultTitle,
    },
  };
}
