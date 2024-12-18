import { QuickNav } from '../QuickNav';
import styles from './WithQuicknav.module.css';

const WithQuicknav = ({ children }: WithQuicknavProps) => {
  return (
    <main className={styles.root}>
      <article className={styles.content} id="quickNavContent">
        {children}
      </article>
      <aside className={styles.nav}>
        <QuickNav />
      </aside>
    </main>
  );
};

interface WithQuicknavProps {
  children: React.ReactNode;
}

export default WithQuicknav;
