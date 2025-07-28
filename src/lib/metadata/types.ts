import type { MDXModule } from 'mdx/types';

export interface MdxModule extends Partial<MDXModule> {
  frontmatter?: {
    title?: string;
    description?: string;
    lastUpdated?: string;
  };
  rawContent?: string;
}

export interface MdxInfo {
  file: string;
  segments: string[];
  slug: string;
}

export interface MetadataOptions {
  defaultTitle: string;
  templatePrefix?: string;
}
