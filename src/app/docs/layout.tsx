import { Sidebar } from './sidebar';

import styles from './layout.module.css';

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.container}>
      <nav className={styles.navigation}>
        <Sidebar />
      </nav>
      <main className={styles.main}>
        <article className={styles.content}>{children}</article>
        <aside className={styles.aside}></aside>
      </main>
    </div>
  );
}
