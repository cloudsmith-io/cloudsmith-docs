import { ApiRequest, ApiResponses, TimeAgo, Heading, Paragraph } from '@/components';
import { loadMdxInfo } from '@/lib/markdown/util';
import { parseSchemas, toOperations } from '@/lib/swagger/parse';
import { toRouteSegments, toSlug } from '@/lib/util';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { withMdxMetadata, withDefaultMetadata, getLastUpdated } from '@/lib/metadata/util';
import { getMenuItem, getActiveAncestors } from '@/lib/menu/util';
import WithQuicknav from '@/components/WithQuickNav';
import { Icon, type IconName } from '@/icons';
import { Link } from '@/components';
import { cx } from 'class-variance-authority';

import styles from './page.module.css';

export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const qualifiedSlug = toSlug(slug);

  // First check if this is an MDX file
  const content = await loadMdxInfo('api');
  const mdxInfo = content.filter((info) => info.slug !== '').find((info) => info.slug === qualifiedSlug);

  if (mdxInfo) {
    return withMdxMetadata(mdxInfo.file, {
      defaultTitle: 'API Documentation',
      templatePrefix: 'Cloudsmith API',
    });
  }

  // For Swagger operations, use the operation details
  const schemas = await parseSchemas();
  const operations = toOperations(schemas);
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
  const content = await loadMdxInfo('api');
  const mdxSlugs = content
    .filter((info) => info.slug !== '') // Exclude the root path
    .map((info) => ({ slug: info.segments }));

  // Generate swagger slugs
  const schemas = await parseSchemas();
  const operations = toOperations(schemas);
  const operationSlugs = operations.map((op) => ({ slug: toRouteSegments(op.slug) }));

  return mdxSlugs.concat(operationSlugs);
};

const Page = async ({ params }: PageProps) => {
  const { slug } = await params;
  const qualifiedSlug = toSlug(slug);

  // First check if this is an MDX file
  const content = await loadMdxInfo('api');
  const mdxInfo = content.find((info) => info.slug === qualifiedSlug);

  const pathname = `${qualifiedSlug}`;
  const menuData = getMenuItem('api');
  const ancestors = getActiveAncestors(pathname, [menuData]);
  const parentTitle = ancestors.length > 1 ? ancestors[ancestors.length - 2].title : null;

  if (mdxInfo) {
    const mdxModule = await import(`@/content/${mdxInfo.file}`);
    const { default: Post } = mdxModule;
    const lastUpdated = getLastUpdated(mdxModule);

    return (
      <WithQuicknav>
        {parentTitle ? (
          <h2 data-quick-nav-ignore className={cx(styles.sectionHeading, 'monoXSUppercase')}>
            {parentTitle}
          </h2>
        ) : null}
        <Post />
        {lastUpdated ? <TimeAgo date={lastUpdated} /> : null}
      </WithQuicknav>
    );
  }

  // Otherwise render as an operation
  const schemas = await parseSchemas();
  const operations = toOperations(schemas);
  const operation = operations.find((op) => op.slug === qualifiedSlug);

  if (operation) {
    const operationParentTitle =
      parentTitle ||
      (operation.menuSegments.length > 1 ? operation.menuSegments[operation.menuSegments.length - 2] : null);

    return (
      <div className={styles.root}>
        {operationParentTitle ? (
          <h2 data-quick-nav-ignore className={cx(styles.sectionHeading, 'monoXSUppercase')}>
            {operationParentTitle}
          </h2>
        ) : null}
        <Heading size="h1">{operation.title}</Heading>
        <div className={styles.description}>
          {operation.description && <Paragraph>{operation.description}</Paragraph>}
          {operation.sandboxLink && (
            <Link href={operation.sandboxLink} className={cx(styles.sandboxLink, 'bodyS')} target="_blank">
              <span>Open API Sandbox</span>
              <Icon name="external" title="Open API Sandbox" />
            </Link>
          )}
        </div>
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
