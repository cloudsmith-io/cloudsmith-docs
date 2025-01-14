'use client';

import { usePathname } from 'next/navigation';
import { cx } from 'class-variance-authority';
import Link from 'next/link';
import { Container, Flex } from '@/components';
import { LogoWordMark, LogoSymbol } from '@/components/Logo';
import { Icon } from '@/icons';

import styles from './Navbar.module.css';

export const Navbar = () => {
  const pathname = usePathname();

  return (
    <div className={cx(styles.root, pathname === '/' && styles.homeNavbar)}>
      <Container className={styles.container}>
        <Link href="/" className={styles.logo}>
          <LogoWordMark className={styles.logoWordmark} />
          <LogoSymbol className={styles.logoSymbol} />
        </Link>

        <span className={styles.currentSection}>
          <Icon name="action/link" title="" />
          <span>Documentation</span>
        </span>

        <Flex gap="m" justify="between" wrap={false} className={cx(styles.navContainer)}>
          <nav className={styles.nav}>
            <Link href="/documentation" className={styles.navLink}>
              <Icon name="action/documentation" title="" />
              Documentation
            </Link>
            <Link href="/guides" className={styles.navLink}>
              <Icon name="action/guide" title="" />
              Guides
            </Link>
            <Link href="/api" className={styles.navLink}>
              <Icon name="action/api" title="" />
              API Reference
            </Link>
          </nav>

          <button aria-label="Search" className={styles.searchButton}>
            <Icon name="search" className={styles.searchIcon} title="" />
            <div className={styles.searchButtonText}>
              <span>Search</span>
              <kbd className={styles.searchButtonKbd}>
                <abbr title="Command">⌘</abbr> K
              </kbd>
            </div>
          </button>

          <button className={styles.menuButton} aria-label="Menu">
            <Icon name="menu" title="" />
          </button>
        </Flex>
      </Container>
    </div>
  );
};
