'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cx } from 'class-variance-authority';
import { AnimatePresence } from 'motion/react';
import * as motion from 'motion/react-client';

import { useNavigation } from '@/app/navigation';
import { Container } from '@/components';
import { LogoSymbol, LogoWordMark } from '@/components/Logo';
import { getActiveMenuItem, getMenuItems } from '@/lib/menu/util';
import { SearchDialog } from '@/components/SearchDialog';
import { Icon } from '@/icons';

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

  const toggle = () => toggleNavigation('globalNav');

  return (
    <>
      <div className={cx(styles.root, { [styles.isHome]: pathname === '/' })}>
        <Container className={styles.container}>
          <div className={styles.top}>
            <div className={styles.left}>
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

            <div className={styles.right}>
              <SearchDialog />
              <Link
                href="https://cloudsmith.com"
                target={'_blank'}
                className={cx(styles.openCloudsmith, 'bodyS')}
                aria-label="Open Cloudsmith">
                Open Cloudsmith
              </Link>

              <button type="button" className={styles.menuButton} aria-label="Menu" onClick={toggle}>
                <Icon name="menu" title="" className={styles.menuIcon} />
              </button>
            </div>
          </div>
          <nav className={styles.nav}>
            {primary?.map((item, i) => (
              <Link
                key={`${item.path}-${i}`}
                href={item.path!}
                className={cx(styles.navLink, { [styles.navLinkActive]: activeMenuItem === item }, 'bodyM')}>
                <Icon name={item.icon!} aria-hidden="true" focusable="false" title="" />
                {item.title}
              </Link>
            ))}
          </nav>
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
