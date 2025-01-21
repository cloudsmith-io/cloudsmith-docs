import { loadContentInfo } from '@/lib/markdown/util';
import { toSlug } from '@/lib/util';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

export const dynamicParams = false;

export const generateStaticParams = async () => {
  const content = await loadContentInfo();
  const mdxSlugs = content.map((info) => ({ slug: info.segments }));
  return mdxSlugs;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  console.log('Generating metadata for:', params); // Debug log

  const { slug } = await params;
  const qualifiedSlug = toSlug(slug);

  const content = await loadContentInfo();
  const mdxInfo = content.find((info) => info.slug === qualifiedSlug);

  if (mdxInfo) {
    console.log('Found MDX info:', mdxInfo); // Debug log
    const mdxModule = await import(`@/content/${mdxInfo.file}`);
    console.log('MDX Module frontmatter:', mdxModule.frontmatter); // Debug log

    // Get title from frontmatter
    const frontmatterTitle = mdxModule.frontmatter?.title;

    // If no frontmatter title, use the first text content as title
    const contentTitle = frontmatterTitle || 'Documentation';

    const metadata = {
      title: {
        template: `%s | Cloudsmith Docs`,
        default: contentTitle,
      },
      description: mdxModule.frontmatter?.description,
    };

    console.log('Returning metadata:', metadata); // Debug log
    return metadata;
  }

  return {
    title: {
      template: `%s | Cloudsmith Docs`,
      default: 'Documentation',
    },
  };
}

const Page = async ({ params }: PageProps) => {
  const { slug } = await params;
  const qualifiedSlug = toSlug(slug);

  const content = await loadContentInfo();
  const mdxInfo = content.find((info) => info.slug === qualifiedSlug);

  if (mdxInfo) {
    const mdxModule = await import(`@/content/${mdxInfo.file}`);
    console.log('MDX Module:', mdxModule); // See what's in the module
    const { default: Post } = mdxModule;
    return <Post />;
  }

  return notFound();
};

interface PageProps {
  params: Promise<{ slug: string[] }>;
}

export default Page;
