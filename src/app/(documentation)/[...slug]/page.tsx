import { loadMdxInfo } from '@/lib/markdown/util';
import { toSlug } from '@/lib/util';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { withMdxMetadata, withDefaultMetadata, getLastUpdated } from '@/lib/metadata/util';
import { TimeAgo } from '@/components';
import { getMenuItem, getActiveAncestors } from '@/lib/menu/util';
import WithQuicknav from '@/components/WithQuickNav';
import { cx } from 'class-variance-authority';

import styles from './page.module.css';

export const dynamicParams = false;

export const generateStaticParams = async () => {
  const content = await loadMdxInfo();
  const mdxSlugs = content.map((info) => ({ slug: info.segments }));
  return mdxSlugs;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const qualifiedSlug = toSlug(slug);

  const content = await loadMdxInfo();
  const mdxInfo = content.find((info) => info.slug === qualifiedSlug);

  if (mdxInfo) {
    return withMdxMetadata(mdxInfo.file, {
      defaultTitle: 'Documentation',
    });
  }

  return withDefaultMetadata({
    defaultTitle: 'Documentation',
  });
}

const Page = async ({ params }: PageProps) => {
  const { slug } = await params;
  const qualifiedSlug = toSlug(slug);

  const content = await loadMdxInfo();
  const mdxInfo = content.find((info) => info.slug === qualifiedSlug);

  if (mdxInfo) {
    const mdxModule = await import(`@/content/${mdxInfo.file}`);
    const { default: Post } = mdxModule;
    const lastUpdated = getLastUpdated(mdxModule);

    const pathname = `/${qualifiedSlug}`;
    const menuData = getMenuItem('documentation');
    const ancestors = getActiveAncestors(pathname, [menuData]);
    const parentTitle = ancestors.length > 1 ? ancestors[ancestors.length - 2].title : null;

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

  return notFound();
};

interface PageProps {
  params: Promise<{ slug: string[] }>;
}

export default Page;
