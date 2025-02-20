import { loadMdxInfo } from '@/lib/markdown/util';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { withMdxMetadata, withDefaultMetadata, getLastUpdated } from '@/lib/metadata/util';
import { TimeAgo } from '@/components';
import WithQuicknav from '@/components/WithQuickNav';

export const generateStaticParams = async () => {
  return [{}]; // Generate just the root /api route
};

export async function generateMetadata(): Promise<Metadata> {
  const content = await loadMdxInfo('api');
  const mdxInfo = content.find((info) => info.slug === '');

  if (mdxInfo) {
    return withMdxMetadata(mdxInfo.file, {
      defaultTitle: 'API Documentation',
      templatePrefix: 'Cloudsmith API Reference',
    });
  }

  return withDefaultMetadata({
    defaultTitle: 'API Documentation',
    templatePrefix: 'Cloudsmith API Reference',
  });
}

/**
 * This page is needed in order to serve api/index.mdx with the API sidebar.
 * catch-all routes don't serve index files.
 */
const Page = async () => {
  const content = await loadMdxInfo('api');
  const mdxInfo = content.find((info) => info.slug === '');

  if (mdxInfo) {
    const mdxModule = await import(`@/content/${mdxInfo.file}`);
    const { default: Post } = mdxModule;
    const lastUpdated = getLastUpdated(mdxModule);

    return (
      <WithQuicknav>
        <Post />
        {lastUpdated ? <TimeAgo date={lastUpdated} /> : null}
      </WithQuicknav>
    );
  }

  return notFound();
};

export default Page;
