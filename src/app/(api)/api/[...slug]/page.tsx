import { ApiRequest, ApiResponses, TimeAgo } from '@/components';
import { loadApiContentInfo } from '@/lib/markdown/util';
import { parseSchema, toOperations } from '@/lib/swagger/parse';
import { toRouteSegments, toSlug } from '@/lib/util';
import { Heading, Paragraph } from '@/markdown';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { withMdxMetadata, withDefaultMetadata, getLastUpdated } from '@/lib/metadata/util';

import styles from './page.module.css';

export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const qualifiedSlug = toSlug(slug);

  // First check if this is an MDX file
  const content = await loadApiContentInfo();
  const mdxInfo = content.find((info) => info.slug === qualifiedSlug);

  if (mdxInfo) {
    return withMdxMetadata(mdxInfo.file, {
      defaultTitle: 'API Documentation',
      templatePrefix: 'Cloudsmith API',
    });
  }

  // For Swagger operations, use the operation details
  const schema = await parseSchema();
  const operations = toOperations(schema);
  const operation = operations.find((op) => op.slug === qualifiedSlug);

  if (operation) {
    return {
      title: {
        template: `%s | Cloudsmith API`,
        default: `${operation.menuSegments.join(' - ')}`,
      },
      description: operation.description,
    };
  }

  return withDefaultMetadata({
    defaultTitle: 'API Documentation',
    templatePrefix: 'Cloudsmith API Reference',
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

  // Otherwise render as an operation
  const schema = await parseSchema();
  const operations = toOperations(schema);
  const operation = operations.find((op) => op.slug === qualifiedSlug);

  if (operation) {
    return (
      <div className={styles.root}>
        <Heading size="h1">{operation.title}</Heading>
        {operation.description ? <Paragraph>{operation.description}</Paragraph> : null}

        <div className={styles.gridRoot}>
          <Heading size="h2" className={styles.fullWidth}>
            Request
          </Heading>

          <ApiRequest {...operation} />

          <Heading size="h2" className={styles.fullWidth}>
            Response
          </Heading>
          <ApiResponses {...operation} />
        </div>
      </div>
    );
  }

  return notFound();
};

interface PageProps {
  params: Promise<{ slug: string[] }>;
}

export default Page;
