import { loadMdxSlugs } from '@/lib/markdown/util';
import { toRouteSegments, toSlug } from '@/lib/util';
import { notFound } from 'next/navigation';

export const dynamicParams = false;

export const generateStaticParams = async () => {
  const mdx = await loadMdxSlugs();
  const mdxSlugs = mdx.map((slug) => ({ slug: toRouteSegments(slug) }));
  return mdxSlugs;
};

const Page = async ({ params }: PageProps) => {
  const { slug } = await params;
  const qualifiedSlug = toSlug(slug);

  // First check if this is an MDX file
  const mdxSlugs = await loadMdxSlugs();
  const mdxFile = mdxSlugs.find((s) => s === qualifiedSlug);

  if (mdxFile) {
    const { default: Post } = await import(`@/content/${qualifiedSlug}.mdx`);
    return <Post />;
  }

  return notFound();
};

interface PageProps {
  params: Promise<{ slug: string[] }>;
}

export default Page;
