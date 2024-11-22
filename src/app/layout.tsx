import styles from './test.module.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={styles.test}>{children}</body>
    </html>
  );
}
