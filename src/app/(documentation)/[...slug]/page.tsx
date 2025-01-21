import { loadContentInfo } from '@/lib/markdown/util';
import { toSlug } from '@/lib/util';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { generateSharedMetadata, generateDefaultMetadata } from '@/lib/metadata/shared';

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
    const mdxModule = await import(`@/content/${mdxInfo.file}`);
    return generateSharedMetadata(mdxModule, {
      defaultTitle: 'Documentation',
    });
  }

  return generateDefaultMetadata({
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
    return <Post />;
  }

  return notFound();
};

interface PageProps {
  params: Promise<{ slug: string[] }>;
}

export default Page;
