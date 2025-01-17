import { loadApiMdxSlugs } from '@/lib/markdown/util';
import { parseSchema, toOperations } from '@/lib/swagger/parse';
import { toRouteSegments, toSlug } from '@/lib/util';
import { Heading, Paragraph } from '@/markdown';
import { notFound } from 'next/navigation';
import { Request } from './_request/Request';
import { Responses } from './_responses/Responses';

import styles from './page.module.css';

export const dynamicParams = false;

export const generateStaticParams = async () => {
  // Generate mdx slugs
  const mdx = await loadApiMdxSlugs();
  const mdxSlugs = mdx.map((slug) => ({ slug: toRouteSegments(slug) }));

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
  const mdxSlugs = await loadApiMdxSlugs();
  const mdxFile = mdxSlugs.find((s) => s === qualifiedSlug);

  if (mdxFile) {
    const { default: Post } = await import(`@/content/api/${qualifiedSlug}.mdx`);
    return <Post />;
  }

  // Otherwise render as an operation
  const schema = await parseSchema();
  const operations = toOperations(schema);
  const operation = operations.find((op) => op.slug === qualifiedSlug);

  if (operation) {
    console.log(operation);

    return (
      <>
        <Heading size="h1">Missing headling for endpoint</Heading>
        {operation.description ? <Paragraph>{operation.description}</Paragraph> : null}

        <div className={styles.gridRoot}>
          <Heading size="h2" className={styles.fullWidth}>
            Request
          </Heading>

          <Request {...operation} />

          <Heading size="h2" className={styles.fullWidth}>
            Response
          </Heading>
          <Responses {...operation} />
        </div>

        {/* Rendering the operation: {operation?.method} {operation?.path}
          <p>JSON:</p>
          <pre style={{ maxWidth: '70vw', overflow: 'auto' }}>{JSON.stringify(operation, null, 2)}</pre> */}
      </>
    );
  }

  return notFound();
};

interface PageProps {
  params: Promise<{ slug: string[] }>;
}

export default Page;
