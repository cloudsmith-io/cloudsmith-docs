import { loadApiContentInfo } from '@/lib/markdown/util';
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
  const content = await loadApiContentInfo();
  const mdxSlugs = content.map((info) => ({ slug: info.segments }));

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
    // console.log(operation);

    return (
      <>
        <Heading size="h1">Missing headline for endpoint</Heading>
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
