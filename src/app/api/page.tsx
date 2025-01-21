import { loadApiContentInfo } from '@/lib/markdown/util';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

export const generateStaticParams = async () => {
  return [{}]; // Generate just the root /api route
};

export async function generateMetadata(): Promise<Metadata> {
  const content = await loadApiContentInfo();
  const mdxInfo = content.find((info) => info.slug === '');

  if (mdxInfo) {
    console.log('Found MDX info:', mdxInfo); // Debug log
    const mdxModule = await import(`@/content/${mdxInfo.file}`);
    console.log('MDX Module frontmatter:', mdxModule.frontmatter); // Debug log

    // Get title from frontmatter
    const frontmatterTitle = mdxModule.frontmatter?.title;

    // If no frontmatter title, use the first text content as title
    const contentTitle = frontmatterTitle || 'API Documentation';

    return {
      title: {
        template: `%s | Cloudsmith Docs`,
        default: contentTitle,
      },
      description: mdxModule.frontmatter?.description,
    };
  }

  return {
    title: {
      template: `%s | Cloudsmith Docs`,
      default: 'API Documentation',
    },
  };
}

/**
 * This page is needed in order to server api/index.mdx with the API sidebar.
 * catch-all routes don't serve index files.
 */
const Page = async () => {
  const content = await loadApiContentInfo();
  const mdxInfo = content.find((info) => info.slug === '');

  if (mdxInfo) {
    const { default: Post } = await import(`@/content/${mdxInfo.file}`);
    return <Post />;
  }

  return notFound();
};

export default Page;
