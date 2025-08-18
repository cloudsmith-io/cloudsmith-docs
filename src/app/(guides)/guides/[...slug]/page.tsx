import { loadMdxInfo } from '@/lib/markdown/util';
import { toSlug } from '@/lib/util';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { withMdxMetadata, withDefaultMetadata, getLastUpdated } from '@/lib/metadata/util';
import { getMenuItem, getActiveAncestors } from '@/lib/menu/util';
import WithQuicknav from '@/components/WithQuickNav';
import { cx } from 'class-variance-authority';

import styles from './page.module.css';

export const dynamicParams = false;

export const generateStaticParams = async () => {
  const content = await loadMdxInfo('guides');
  const mdxSlugs = content.filter((info) => info.slug !== '').map((info) => ({ slug: info.segments }));
  return mdxSlugs;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const qualifiedSlug = toSlug(slug);

  const content = await loadMdxInfo('guides');
  const mdxInfo = content.find((info) => info.slug === qualifiedSlug);

  if (mdxInfo) {
    return withMdxMetadata(mdxInfo.file, {
      defaultTitle: 'Documentation',
    });
  }

  return withDefaultMetadata({
    defaultTitle: 'Guides',
  });
}

const Page = async ({ params }: PageProps) => {
  const { slug } = await params;
  const qualifiedSlug = toSlug(slug);

  const content = await loadMdxInfo('guides');
  const mdxInfo = content.find((info) => info.slug === qualifiedSlug);

  if (mdxInfo) {
    const { default: Post } = await import(`@/content/${mdxInfo.file}`);
    const repoPath = `src/content/${mdxInfo.file}`;
    const lastUpdated = await getLastUpdated(mdxInfo);

    const pathname = `/${qualifiedSlug}`;
    const menuData = getMenuItem('guides');
    const ancestors = getActiveAncestors(pathname, [menuData]);
    const parentTitle = ancestors.length > 1 ? ancestors[ancestors.length - 2].title : null;

    return (
      <WithQuicknav showPageInfo path={repoPath} lastUpdated={lastUpdated || null}>
        {parentTitle ? (
          <h2 data-quick-nav-ignore className={cx(styles.sectionHeading, 'monoXSUppercase')}>
            {parentTitle}
          </h2>
        ) : null}
        <Post />
      </WithQuicknav>
    );
  }

  return notFound();
};

interface PageProps {
  params: Promise<{ slug: string[] }>;
}

export default Page;
