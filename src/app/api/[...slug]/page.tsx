import { parseSchema, toOperations } from '@/lib/swagger/parse';
import { createSlug, toRouteSegments } from '@/lib/swagger/util';

export const dynamicParams = false;

export const generateStaticParams = async () => {
  const schema = await parseSchema();
  const operations = toOperations(schema);

  // Todo: Load all the mdx slugs that are inside the /api folder

  return operations.map((op) => ({ slug: toRouteSegments(op.slug) }));
};

const Page = async ({ params }: PageProps) => {
  const { slug } = await params;
  const schema = await parseSchema();
  const operations = toOperations(schema);
  const qualifiedSlug = createSlug(slug);
  const operation = operations.find((op) => op.slug === qualifiedSlug);

  // if there is no operation, render markdown file

  return (
    <div>
      Rendering the operation: {operation?.method} {operation?.path}
      <p>JSON:</p>
      <pre>{JSON.stringify(operation, null, 2)}</pre>
    </div>
  );
};

interface PageProps {
  params: Promise<{ slug: string[] }>;
}

export default Page;
