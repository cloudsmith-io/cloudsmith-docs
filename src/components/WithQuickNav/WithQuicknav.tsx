import { Icon } from '@/icons';
import { quickNavContentId } from '@/lib/constants/quickNav';
import { QuickNav } from '../QuickNav';
import { PageInfo } from '../PageInfo';

import styles from './WithQuicknav.module.css';

/*
  This component has a SVG symbol that is used to create a link icon for when hovering headings.
  See next.config.mjs for the SVG symbol usage.
*/

const WithQuicknav = ({ children, showPageInfo = false, path = '', lastUpdated }: WithQuicknavProps) => {
  return (
    <main className={styles.root}>
      <article className={styles.content} id={quickNavContentId}>
        <Icon name="action/link" as="symbol" title="" />
        {children}
      </article>
      <aside className={styles.nav}>
        <div className={styles.navWrapper}>
          <QuickNav />
          {showPageInfo && <PageInfo path={path} lastUpdated={lastUpdated} />}
        </div>
      </aside>
    </main>
  );
};

interface WithQuicknavProps {
  children: React.ReactNode;
  showPageInfo?: boolean;
  path?: string;
  lastUpdated?: string;
}

export default WithQuicknav;
