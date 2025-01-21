import { loadApiContentInfo } from '@/lib/markdown/util';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { generateSharedMetadata, generateDefaultMetadata } from '@/lib/metadata/shared';

export const generateStaticParams = async () => {
  return [{}]; // Generate just the root /api route
};

export async function generateMetadata(): Promise<Metadata> {
  const content = await loadApiContentInfo();
  const mdxInfo = content.find((info) => info.slug === '');

  if (mdxInfo) {
    const mdxModule = await import(`@/content/${mdxInfo.file}`);
    return generateSharedMetadata(mdxModule, {
      defaultTitle: 'API Documentation',
      templatePrefix: 'Cloudsmith API',
      filePath: mdxInfo.file,
    });
  }

  return generateDefaultMetadata({
    defaultTitle: 'API Documentation',
    templatePrefix: 'Cloudsmith API',
  });
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
