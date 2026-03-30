import { Icon } from '@/icons';

import { PageInfo } from '../PageInfo';
import { QuickNav } from '../QuickNav';
import styles from './WithQuicknav.module.css';

/*
  This component has a SVG symbol that is used to create a link icon for when hovering headings.
  See next.config.mjs for the SVG symbol usage.
*/

const WithQuicknav = ({ children, showPageInfo = false, path = '', lastUpdated }: WithQuicknavProps) => {
  return (
    <main className={styles.root}>
      <article className={styles.content} data-quick-nav-content>
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
