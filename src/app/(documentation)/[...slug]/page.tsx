import { loadContentInfo } from '@/lib/markdown/util';
import { toSlug } from '@/lib/util';
import { notFound } from 'next/navigation';

export const dynamicParams = false;

export const generateStaticParams = async () => {
  const content = await loadContentInfo();
  const mdxSlugs = content.map((info) => ({ slug: info.segments }));
  return mdxSlugs;
};

const Page = async ({ params }: PageProps) => {
  const { slug } = await params;
  const qualifiedSlug = toSlug(slug);

  const content = await loadContentInfo();
  const mdxInfo = content.find((info) => info.slug === qualifiedSlug);

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
