import { cx } from 'class-variance-authority';

import { mdSystem, replica, replicaMono } from './_assets/fonts';

import './_styles/critical.css';
import styles from './layout.module.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={cx(mdSystem.variable, replica.variable, replicaMono.variable)}>
      <body>
        <div className={styles.container}>{children}</div>
      </body>
    </html>
  );
}
