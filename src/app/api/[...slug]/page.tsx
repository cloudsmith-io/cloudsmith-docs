import { RequestResponse } from '@/components';
import { parseSchema, toOperations } from '@/lib/swagger/parse';
import { createSlug, toRouteSegments } from '@/lib/swagger/util';

export const dynamicParams = false;

export const generateStaticParams = async () => {
  const schema = await parseSchema();
  const operations = toOperations(schema);
  return operations.map((op) => ({ slug: toRouteSegments(op.slug) }));
};

const Page = async ({ params }: PageProps) => {
  const { slug } = await params;
  const schema = await parseSchema();
  const operations = toOperations(schema);
  const qualifiedSlug = createSlug(slug);
  const operation = operations.find((op) => op.slug === qualifiedSlug);

  return (
    <div>
      {operation ? <RequestResponse {...operation} /> : null}
      Rendering the operation: {operation?.method} {operation?.path}
      <p>JSON:</p>
      <pre style={{ maxWidth: '70vw', overflowY: 'auto' }}>{JSON.stringify(operation, null, 2)}</pre>
    </div>
  );
};

interface PageProps {
  params: Promise<{ slug: string[] }>;
}

export default Page;
