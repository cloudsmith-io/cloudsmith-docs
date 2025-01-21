import { loadApiContentInfo } from '@/lib/markdown/util';
import { RequestResponse } from '@/components';
import { parseSchema, toOperations } from '@/lib/swagger/parse';
import { toRouteSegments, toSlug } from '@/lib/util';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const qualifiedSlug = toSlug(slug);

  // First check if this is an MDX file
  const content = await loadApiContentInfo();
  const mdxInfo = content.find((info) => info.slug === qualifiedSlug);

  if (mdxInfo) {
    console.log('Found MDX info:', mdxInfo); // Debug log
    const mdxModule = await import(`@/content/${mdxInfo.file}`);
    console.log('MDX Module frontmatter:', mdxModule.frontmatter); // Debug log

    // Get title from frontmatter
    const frontmatterTitle = mdxModule.frontmatter?.title;

    // If no frontmatter title, use the first text content as title
    const contentTitle = frontmatterTitle || 'API Documentation';

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

  // For Swagger operations, use the operation details
  const schema = await parseSchema();
  const operations = toOperations(schema);
  const operation = operations.find((op) => op.slug === qualifiedSlug);

  if (operation) {
    return {
      title: {
        template: `%s | Cloudsmith API`,
        default: `${operation.method.toUpperCase()} ${operation.path}`,
      },
      description: operation.description,
    };
  }

  return {
    title: {
      template: `%s | Cloudsmith Docs`,
      default: 'API Documentation',
    },
  };
}

export const generateStaticParams = async () => {
  // Generate mdx slugs
  const content = await loadApiContentInfo();
  const mdxSlugs = content
    .filter((info) => info.slug !== '') // Exclude the root path
    .map((info) => ({ slug: info.segments }));

  // Generate swagger slugs
  const schema = await parseSchema();
  const operations = toOperations(schema);
  const operationSlugs = operations.map((op) => ({ slug: toRouteSegments(op.slug) }));

  return mdxSlugs.concat(operationSlugs);
};

const Page = async ({ params }: PageProps) => {
  const { slug } = await params;
  const qualifiedSlug = toSlug(slug);

  // First check if this is an MDX file
  const content = await loadApiContentInfo();
  const mdxInfo = content.find((info) => info.slug === qualifiedSlug);

  if (mdxInfo) {
    const { default: Post } = await import(`@/content/${mdxInfo.file}`);
    return <Post />;
  }

  // Otherwise render as an operation
  const schema = await parseSchema();
  const operations = toOperations(schema);
  const operation = operations.find((op) => op.slug === qualifiedSlug);

  if (operation) {
    return (
      <div>
        {operation ? <RequestResponse {...operation} /> : null}
        Rendering the operation: {operation?.method} {operation?.path}
        <p>JSON:</p>
        <pre style={{ maxWidth: '70vw', overflow: 'auto' }}>{JSON.stringify(operation, null, 2)}</pre>
      </div>
    );
  }

  return notFound();
};

interface PageProps {
  params: Promise<{ slug: string[] }>;
}

export default Page;
