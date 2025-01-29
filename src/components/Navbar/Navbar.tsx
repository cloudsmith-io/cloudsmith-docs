'use client';

import { useNavigation } from '@/app/navigation';
import { Container, Flex } from '@/components';
import { LogoSymbol, LogoWordMark } from '@/components/Logo';
import { Icon, type IconName } from '@/icons';
import { cx } from 'class-variance-authority';
import { AnimatePresence } from 'motion/react';
import * as motion from 'motion/react-client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { getNavBarItems } from '@/lib/menu/util';

import styles from './Navbar.module.css';

export const Navbar = () => {
  const pathname = usePathname();
  const { navigationState, toggleNavigation } = useNavigation();
  const toggle = () => toggleNavigation('globalNav');

  return (
    <>
      <div className={cx(styles.root, { [styles.homeNavbar]: pathname === '/' })}>
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
              {getNavBarItems().map(([key, item]) => (
                <Link key={key} href={item.path!} className={styles.navLink}>
                  <Icon name={item.icon as IconName} aria-hidden="true" focusable="false" title="" />
                  {item.title}
                </Link>
              ))}
            </nav>

            <button type="button" aria-label="Search" className={styles.searchButton}>
              <Icon name="search" className={styles.searchIcon} title="" />
              <div className={styles.searchButtonText}>
                <span>Search</span>
                <kbd className={styles.searchButtonKbd}>
                  <abbr title="Command">⌘</abbr> K
                </kbd>
              </div>
            </button>

            <button type="button" className={styles.menuButton} aria-label="Menu" onClick={toggle}>
              <Icon name="menu" title="" />
            </button>
          </Flex>
        </Container>
      </div>

      <AnimatePresence initial={false}>
        {navigationState === 'globalNav' ? (
          <>
            <motion.div
              key="mobileBackground"
              className={styles.mobileBackground}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, ease: 'easeInOut' }}
              onClick={toggle}
              role="button"
              tabIndex={0}
            />

            <motion.div
              key="mobileNavbar"
              className={styles.mobileNavbar}
              initial={{ transform: 'translateX(50%)', opacity: 0 }}
              animate={{ transform: 'translateX(0%)', opacity: 1 }}
              exit={{ transform: 'translateX(50%)', opacity: 0 }}
              transition={{ duration: 0.2, ease: 'easeInOut' }}>
              <button className={styles.closeButton} onClick={toggle}>
                <Icon name="close" title="" className={styles.closeIcon} />
              </button>
              {/* TODO: Add navigation links from JSON and adjust UI */}
            </motion.div>
          </>
        ) : null}
      </AnimatePresence>
    </>
  );
};
