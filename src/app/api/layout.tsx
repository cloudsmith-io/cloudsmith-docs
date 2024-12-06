import { Suspense } from 'react';

import { Sidebar } from './sidebar';

import styles from './layout.module.css';

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.container}>
      <nav className={styles.navigation}>
        <Suspense>
          <Sidebar />
        </Suspense>
      </nav>
      <main className={styles.main}>
        <article className={styles.content}>{children}</article>
        <Suspense>
          <aside className={styles.aside}></aside>
        </Suspense>
      </main>
    </div>
  );
}
