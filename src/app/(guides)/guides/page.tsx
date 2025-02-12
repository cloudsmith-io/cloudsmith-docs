import { loadMdxInfo } from '@/lib/markdown/util';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { withMdxMetadata, withDefaultMetadata, getLastUpdated } from '@/lib/metadata/util';
import { TimeAgo } from '@/components';

export const generateStaticParams = async () => {
  return [{}]; // Generate just the root /api route
};

export async function generateMetadata(): Promise<Metadata> {
  const content = await loadMdxInfo('guides');
  const mdxInfo = content.find((info) => info.slug === '');

  const defaultMeta = {
    defaultTitle: 'Guides',
  };

  if (mdxInfo) {
    return withMdxMetadata(mdxInfo.file, defaultMeta);
  }

  return withDefaultMetadata(defaultMeta);
}

/**
 * This page is needed in order to serve guides/index.mdx with the guides sidebar.
 * catch-all routes don't serve index files.
 */
const Page = async () => {
  const content = await loadMdxInfo('guides');
  const mdxInfo = content.find((info) => info.slug === '');

  if (mdxInfo) {
    const mdxModule = await import(`@/content/${mdxInfo.file}`);
    const { default: Post } = mdxModule;
    const lastUpdated = getLastUpdated(mdxModule);

    return (
      <div>
        <Post />
        {lastUpdated ? <TimeAgo date={lastUpdated} /> : null}
      </div>
    );
  }

  return notFound();
};

export default Page;
