import Link from 'next/link';
import { Container } from '../Container';
import Image from 'next/image';

import styles from './Navbar.module.css';

export const Navbar = () => {
  return (
    <div className={styles.root}>
      <Container className={styles.container}>
        <Link href="/" className={styles.logo}>
          <Image src="/images/cloudsmith-logo.svg" alt="Cloudsmith" width={164} height={25} />
        </Link>
        <nav className={styles.nav}>
          <Link href="/documentation">Documentation</Link>
          <Link href="/guides">Guides</Link>
          <Link href="/api">API Reference</Link>
        </nav>
      </Container>
    </div>
  );
};
