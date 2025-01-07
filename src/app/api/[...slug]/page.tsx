import { parseSchema, toOperations } from '@/lib/swagger/parse';
import { toRouteSegments } from '@/lib/util';

export const dynamicParams = false;

export const generateStaticParams = async () => {
  const schema = await parseSchema();
  const operations = toOperations(schema);
  return operations.map((op) => {
    const slug = toRouteSegments(op.slug);
    slug.shift(); // Get rid of /api
    return { slug };
  });
};

const Page = async ({ params }: PageProps) => {
  const { slug } = await params;
  // TODO: Load the content we need from operations;
  return <div>Rendering the slug: {slug}</div>;
};

interface PageProps {
  params: Promise<{ slug: string[] }>;
}

export default Page;
