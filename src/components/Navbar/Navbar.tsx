import Link from 'next/link';
import { Container } from '../Container';

import styles from './Navbar.module.css';

export const Navbar = () => {
  return (
    <div className={styles.root}>
      <Container className={styles.container}>
        <div className={styles.logo}>Cloudsmith</div>
        <nav className={styles.nav}>
          <Link href="/documentation">Documentation</Link>
          <Link href="/guides">Guides</Link>
          <Link href="/api">API Reference</Link>
        </nav>
      </Container>
    </div>
  );
};
