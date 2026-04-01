'use client';

import { cx } from 'class-variance-authority';
import { AnimatePresence } from 'motion/react';
import * as motion from 'motion/react-client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { useNavigation } from '@/app/navigation';
import { Container } from '@/components';
import { LogoSymbol, LogoWordMark } from '@/components/Logo';
import { SearchDialog } from '@/components/SearchDialog';
import { Icon } from '@/icons';
import { getActiveMenuItem, getMenuItems } from '@/lib/menu/util';

import styles from './Navbar.module.css';

export const Navbar = () => {
  const pathname = usePathname();
  const { navigationState, toggleNavigation } = useNavigation();

  const [documentationItem, guidesItem, apiItem, mobileNavbarItem] = getMenuItems([
    'documentation',
    'guides',
    'api',
    'mobileNavbar',
  ]);

  const primary = [documentationItem, guidesItem, apiItem];
  const secondary = mobileNavbarItem.children;
  const activeMenuItem = getActiveMenuItem(pathname);
  const isHome = pathname === '/';
  const toggle = () => toggleNavigation('globalNav');
  const primaryNav = (
    <>
      {primary?.map((item, i) => (
        <Link
          key={`${item.path}-${i}`}
          href={item.path!}
          className={cx(
            styles.navLink,
            { [styles.navLinkActive]: !isHome && activeMenuItem === item },
            'bodyM',
          )}>
          <Icon name={item.icon!} aria-hidden="true" focusable="false" title="" />
          {item.title}
        </Link>
      ))}
    </>
  );

  return (
    <>
      <div className={cx(styles.root, { [styles.isHome]: isHome })}>
        <Container className={styles.container}>
          {isHome ? (
            <div className={styles.top}>
              <div className={styles.topStart}>
                <Link href="/" className={styles.logo}>
                  <LogoWordMark className={styles.logoWordmark} />
                  <LogoSymbol className={styles.logoSymbol} />
                </Link>

                {activeMenuItem ? (
                  <span className={styles.currentSection}>
                    {activeMenuItem.icon && <Icon name={activeMenuItem.icon} title="" />}
                    <span>{activeMenuItem.title}</span>
                  </span>
                ) : null}
              </div>

              <nav className={styles.nav}>{primaryNav}</nav>

              <div className={styles.topEnd}>
                <Link
                  href="https://cloudsmith.com/contact/"
                  target={'_blank'}
                  className={cx(styles.bookDemo, 'headlineXXXS')}>
                  Book a demo
                </Link>
                <Link
                  href="https://app.cloudsmith.com/login"
                  target={'_blank'}
                  className={cx(styles.openCloudsmith, 'headlineXXXS', styles.light)}
                  aria-label="Login">
                  Login
                </Link>

                <button
                  type="button"
                  className={cx(styles.menuButton, styles.light)}
                  aria-label="Menu"
                  onClick={toggle}>
                  <Icon name="menu" title="" className={styles.menuIcon} />
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className={styles.topSecondary}>
                <div className={cx(styles.topStart, styles.topSecondaryStart)}>
                  <Link href="/" className={styles.logo}>
                    <LogoWordMark className={styles.logoWordmark} />
                    <LogoSymbol className={styles.logoSymbol} />
                  </Link>

                  {activeMenuItem ? (
                    <span className={styles.currentSection}>
                      {activeMenuItem.icon && <Icon name={activeMenuItem.icon} title="" />}
                      <span>{activeMenuItem.title}</span>
                    </span>
                  ) : null}
                </div>

                <div className={styles.topSecondarySearch}>
                  <SearchDialog
                    className={styles.search}
                    triggerTheme="dark"
                    dialogTheme="light"
                    triggerVariant="compact"
                  />
                </div>

                <div className={cx(styles.topEnd, styles.topSecondaryEnd)}>
                  <Link
                    href="https://cloudsmith.com/contact/"
                    target={'_blank'}
                    className={cx(styles.bookDemo, 'headlineXXXS')}>
                    Book a demo
                  </Link>
                  <Link
                    href="https://app.cloudsmith.com/login"
                    target={'_blank'}
                    className={cx(styles.openCloudsmith, 'headlineXXXS')}
                    aria-label="Login">
                    Login
                  </Link>

                  <button type="button" className={styles.menuButton} aria-label="Menu" onClick={toggle}>
                    <Icon name="menu" title="" className={styles.menuIcon} />
                  </button>
                </div>
              </div>

              <div className={styles.secondaryNavRow}>
                <nav className={styles.secondaryNav}>{primaryNav}</nav>
              </div>
            </>
          )}
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

            <motion.nav
              key="mobileNavbar"
              className={styles.mobileNavbar}
              initial={{ translateX: '50%', opacity: 0 }}
              animate={{ translateX: '0%', opacity: 1 }}
              exit={{ translateX: '50%', opacity: 0 }}
              transition={{ duration: 0.2, ease: 'easeInOut' }}>
              <button className={styles.closeButton} onClick={toggle}>
                <Icon name="action/close" title="" className={styles.closeIcon} />
              </button>

              {[primary, secondary].map((items, index) => (
                <ul key={index} className={styles.mobileNav}>
                  {items?.map((item, i) => (
                    <li key={`${item.path}-${i}`}>
                      <Link href={item.path!} className={styles.mobileNavLink}>
                        {item.icon && (
                          <Icon
                            name={item.icon}
                            className={styles.mobileNavIcon}
                            aria-hidden="true"
                            focusable="false"
                            title=""
                          />
                        )}
                        {item.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              ))}
            </motion.nav>
          </>
        ) : null}
      </AnimatePresence>
    </>
  );
};
