import styles from './WithQuicknav.module.css';

const WithQuicknav = ({ children }: WithQuicknavProps) => {
  return (
    <main className={styles.root}>
      <article className={styles.content}>{children}</article>
      <aside className={styles.nav}>Quick nav here</aside>
    </main>
  );
};

interface WithQuicknavProps {
  children: React.ReactNode;
}

export default WithQuicknav;
