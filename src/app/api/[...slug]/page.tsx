import { loadApiContentInfo } from '@/lib/markdown/util';
import { RequestResponse } from '@/components';
import { parseSchema, toOperations } from '@/lib/swagger/parse';
import { toRouteSegments, toSlug } from '@/lib/util';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { generateSharedMetadata, generateDefaultMetadata } from '@/lib/metadata/shared';

export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const qualifiedSlug = toSlug(slug);

  // First check if this is an MDX file
  const content = await loadApiContentInfo();
  const mdxInfo = content.find((info) => info.slug === qualifiedSlug);

  if (mdxInfo) {
    const mdxModule = await import(`@/content/${mdxInfo.file}`);
    return generateSharedMetadata(mdxModule, {
      defaultTitle: 'API Documentation',
      templatePrefix: 'Cloudsmith API',
      filePath: mdxInfo.file,
    });
  }

  // For Swagger operations, use the operation details
  const schema = await parseSchema();
  const operations = toOperations(schema);
  const operation = operations.find((op) => op.slug === qualifiedSlug);
  console.log('operation', operation);

  if (operation) {
    return {
      title: {
        template: `%s | Cloudsmith API`,
        default: `${operation.menuSegments.join(' - ')}`,
      },
      description: operation.description,
    };
  }

  return generateDefaultMetadata({
    defaultTitle: 'API Documentation',
    templatePrefix: 'Cloudsmith API',
  });
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
