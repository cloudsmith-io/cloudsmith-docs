import { loadMdxInfo } from '@/lib/markdown/util';
import { toSlug } from '@/lib/util';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { withMdxMetadata, withDefaultMetadata, getLastUpdated } from '@/lib/metadata/util';
import { TimeAgo } from '@/components';
import WithQuicknav from '@/components/WithQuickNav';

export const dynamicParams = false;

export const generateStaticParams = async () => {
  const content = await loadMdxInfo('guides');
  const mdxSlugs = content.filter((info) => info.slug !== '').map((info) => ({ slug: info.segments }));
  return mdxSlugs;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const qualifiedSlug = toSlug(slug);

  const content = await loadMdxInfo('guides');
  const mdxInfo = content.find((info) => info.slug === qualifiedSlug);

  if (mdxInfo) {
    return withMdxMetadata(mdxInfo.file, {
      defaultTitle: 'Documentation',
    });
  }

  return withDefaultMetadata({
    defaultTitle: 'Guides',
  });
}

const Page = async ({ params }: PageProps) => {
  const { slug } = await params;
  const qualifiedSlug = toSlug(slug);

  const content = await loadMdxInfo('guides');
  const mdxInfo = content.find((info) => info.slug === qualifiedSlug);

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

interface PageProps {
  params: Promise<{ slug: string[] }>;
}

export default Page;
