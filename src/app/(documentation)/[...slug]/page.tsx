import { loadContentInfo } from '@/lib/markdown/util';
import { toSlug } from '@/lib/util';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { withMdxMetadata, withDefaultMetadata, getLastUpdated } from '@/lib/metadata/util';
import { TimeAgo } from '@/components';

export const dynamicParams = false;

export const generateStaticParams = async () => {
  const content = await loadContentInfo();
  const mdxSlugs = content.map((info) => ({ slug: info.segments }));
  return mdxSlugs;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const qualifiedSlug = toSlug(slug);

  const content = await loadContentInfo();
  const mdxInfo = content.find((info) => info.slug === qualifiedSlug);

  if (mdxInfo) {
    return withMdxMetadata(mdxInfo.file, {
      defaultTitle: 'Documentation',
    });
  }

  return withDefaultMetadata({
    defaultTitle: 'Documentation',
  });
}

const Page = async ({ params }: PageProps) => {
  const { slug } = await params;
  const qualifiedSlug = toSlug(slug);

  const content = await loadContentInfo();
  const mdxInfo = content.find((info) => info.slug === qualifiedSlug);

  if (mdxInfo) {
    const mdxModule = await import(`@/content/${mdxInfo.file}`);
    const { default: Post } = mdxModule;
    const lastUpdated = getLastUpdated(mdxModule);

    return (
      <>
        <Post />
        {lastUpdated ? <TimeAgo date={lastUpdated} /> : null}
      </>
    );
  }

  return notFound();
};

interface PageProps {
  params: Promise<{ slug: string[] }>;
}

export default Page;
