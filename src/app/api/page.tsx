import { loadApiContentInfo } from '@/lib/markdown/util';
import { notFound } from 'next/navigation';

/**
 * This page is needed in order to server api/index.mdx with the API sidebar.
 * catch-all routes don't serve index files.
 */
const Page = async ({ params }: PageProps) => {
  const content = await loadApiContentInfo();
  const mdxInfo = content.find((info) => info.slug === '');

  if (mdxInfo) {
    const { default: Post } = await import(`@/content/${mdxInfo.file}`);
    return <Post />;
  }

  return notFound();
};

interface PageProps {
  params: Promise<{ slug: string[] }>;
}

export default Page;
