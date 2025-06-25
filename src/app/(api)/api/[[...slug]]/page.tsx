import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { toOperations, parseSchema } from '@/lib/swagger/parse';
import { ApiOperation } from '@/lib/swagger/types';
import WithQuickNav from '@/components/WithQuickNav';
import { ApiRequest } from '@/components/ApiRequest';
import { ApiResponses } from '@/components/ApiResponses';
import { Heading, Paragraph, TimeAgo } from '@/components';
import { loadMdxInfo } from '@/lib/markdown/util';
import { withMdxMetadata, withDefaultMetadata, getLastUpdated } from '@/lib/metadata/util';
import page from './page.module.css';

async function getOperation(slug: string[]): Promise<ApiOperation | undefined> {
  if (!slug || slug.length < 2) return undefined;

  const version = slug[0] as 'v2' | 'v3';
  const operationSlug = slug.slice(1).join('/');

  if (version !== 'v2' && version !== 'v3') {
    return undefined;
  }

  const schema = await parseSchema(version);
  const operations = toOperations(schema, version);
  return operations.find((op) => op.slug === operationSlug);
}

export async function generateStaticParams() {
  const [schemaV3, schemaV2] = await Promise.all([
    parseSchema('v3'),
    parseSchema('v2'),
  ]);

  const operationsV3 = toOperations(schemaV3, 'v3');
  const operationsV2 = toOperations(schemaV2, 'v2');
  const allOperations = [...operationsV3, ...operationsV2];

  const operationSlugs = allOperations.map((op) => ({
    slug: [op.version, ...op.slug.split('/')],
  }));

  // IMPORTANT: Add an empty slug to ensure the root /api page is generated.
  // This was the cause of the disappearing menu items.
  return [...operationSlugs, { slug: [] }];
}

export async function generateMetadata({ params }: { params: { slug?: string[] } }): Promise<Metadata> {
  if (!params.slug || params.slug.length === 0) {
      const content = await loadMdxInfo('api');
      const mdxInfo = content.find((info) => info.slug === '');
      if (mdxInfo) {
          return withMdxMetadata(mdxInfo.file, {
              defaultTitle: 'API Documentation',
              templatePrefix: 'Cloudsmith API Reference',
          });
      }
      return withDefaultMetadata({
          defaultTitle: 'API Documentation',
          templatePrefix: 'Cloudsmith API Reference',
      });
  }
  
  const operation = await getOperation(params.slug);
  if(operation) {
    return {
      title: `${operation.title} | Cloudsmith API Reference`,
      description: operation.summary,
    }
  }

  return {
    title: 'API Documentation',
  };
}


export default async function Page({ params }: { params: { slug?: string[] } }) {
  if (!params.slug || params.slug.length === 0) {
      const content = await loadMdxInfo('api');
      const mdxInfo = content.find((info) => info.slug === '');

      if (mdxInfo) {
          const mdxModule = await import(`@/content/${mdxInfo.file}`);
          const { default: Post } = mdxModule;
          const lastUpdated = getLastUpdated(mdxModule);

          return (
              <WithQuickNav>
                  <div className={page.root}>
                    <Post />
                    {lastUpdated ? <TimeAgo date={lastUpdated} /> : null}
                  </div>
              </WithQuickNav>
          );
      }
  }

  const operation = await getOperation(params.slug as string[]);

  if (!operation) {
    notFound();
  }

  return (
    <WithQuickNav>
      <div className={page.root}>
        <Heading size="h1" className={page.fullWidth}>{operation.title}</Heading>
        {operation.summary && <Paragraph className={page.fullWidth}>{operation.summary}</Paragraph>}
        
        <div className={page.gridRoot}>
            <Heading size="h2" className={page.fullWidth}>Request</Heading>
            <ApiRequest
                method={operation.method}
                path={operation.path}
                parameters={operation.parameters}
                requestBody={operation.requestBody}
            />
        </div>
        <div className={page.gridRoot}>
            <Heading size="h2" className={page.fullWidth}>Response</Heading>
            <ApiResponses responses={operation.responses} />
        </div>
      </div>
    </WithQuickNav>
  );
}
