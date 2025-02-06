'use client';

import { useNavigation } from '@/app/navigation';
import { Container, Flex } from '@/components';
import { LogoSymbol, LogoWordMark } from '@/components/Logo';
import { Icon } from '@/icons';
import { getActiveItem, getNavBarItems } from '@/lib/menu/util';
import { cx } from 'class-variance-authority';
import { AnimatePresence } from 'motion/react';
import * as motion from 'motion/react-client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import styles from './Navbar.module.css';
import { SearchDialog } from '../SearchDialog';

export const Navbar = () => {
  const pathname = usePathname();
  const { navigationState, toggleNavigation } = useNavigation();
  const { primary, secondary } = getNavBarItems();
  const primaryActive = getActiveItem(pathname, primary);
  const toggle = () => toggleNavigation('globalNav');

  return (
    <>
      <div className={cx(styles.root, { [styles.homeNavbar]: pathname === '/' })}>
        <Container className={styles.container}>
          <Link href="/" className={styles.logo}>
            <LogoWordMark className={styles.logoWordmark} />
            <LogoSymbol className={styles.logoSymbol} />
          </Link>

          {primaryActive ? (
            <span className={styles.currentSection}>
              {primaryActive[1]?.icon && <Icon name={primaryActive[1].icon} title="" />}
              <span>{primaryActive[1]?.title}</span>
            </span>
          ) : null}

          <Flex gap="m" justify="between" wrap={false} className={cx(styles.navContainer)}>
            <nav className={styles.nav}>
              {primary?.map(([key, item]) => (
                <Link
                  key={key}
                  href={item.path!}
                  className={cx(styles.navLink, { [styles.navLinkActive]: primaryActive?.[0] === key })}>
                  <Icon name={item.icon!} aria-hidden="true" focusable="false" title="" />
                  {item.title}
                </Link>
              ))}
            </nav>

            <SearchDialog />

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

            <motion.nav
              key="mobileNavbar"
              className={styles.mobileNavbar}
              initial={{ translateX: '50%', opacity: 0 }}
              animate={{ translateX: '0%', opacity: 1 }}
              exit={{ translateX: '50%', opacity: 0 }}
              transition={{ duration: 0.2, ease: 'easeInOut' }}>
              <button className={styles.closeButton} onClick={toggle}>
                <Icon name="close" title="" className={styles.closeIcon} />
              </button>

              {[primary, secondary].map((items, index) => (
                <ul key={index} className={styles.mobileNav}>
                  {items?.map(([key, item]) => (
                    <li key={key}>
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
