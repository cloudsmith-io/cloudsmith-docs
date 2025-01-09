export const dynamicParams = false;

export const generateStaticParams = () => {
  // Todo: Load slugs based on .mdx files in content
  return [{ slug: ['catch-all'] }];
};

const Page = async ({ params }: PageProps) => {
  const { slug } = await params;
  console.log(slug);
  const { default: Post } = await import(`@/content/catch-all.mdx`);
  return <Post />;
};

interface PageProps {
  params: Promise<{ slug: string[] }>;
}

export default Page;
