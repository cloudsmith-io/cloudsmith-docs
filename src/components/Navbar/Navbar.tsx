'use client';

import { useEffect } from 'react';

import { cx } from 'class-variance-authority';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { useNavigation } from '@/app/navigation';
import { Button, Container } from '@/components';
import { LogoSymbol, LogoWordMark } from '@/components/Logo';
import { SearchDialog } from '@/components/SearchDialog';
import { Icon } from '@/icons';
import { getActiveMenuItem, getMenuItems } from '@/lib/menu/util';
import { isExternalHref } from '@/util/url';

import styles from './Navbar.module.css';

export const Navbar = () => {
  const pathname = usePathname();
  const { navigationState, toggleNavigation } = useNavigation();
  const isGlobalNavOpen = navigationState === 'globalNav';

  useEffect(() => {
    document.body.style.overflow = isGlobalNavOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isGlobalNavOpen]);

  const [documentationItem, guidesItem, apiItem, mobileNavbarItem] = getMenuItems([
    'documentation',
    'guides',
    'api',
    'mobileNavbar',
  ]);

  const primary = [documentationItem, guidesItem, apiItem];
  const secondary = mobileNavbarItem.children ?? [];
  const homeIndex = secondary.findIndex((item) => item.title === 'Home');
  const blogIndex = secondary.findIndex((item) => item.title === 'Blog');
  const orderedMobileItems =
    homeIndex !== -1 && blogIndex !== -1 && blogIndex > homeIndex
      ? [
          ...secondary.slice(0, homeIndex + 1),
          ...primary,
          ...secondary.slice(homeIndex + 1, blogIndex),
          ...secondary.slice(blogIndex),
        ]
      : [...primary, ...secondary];
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
          <Icon
            name={item.icon!}
            className={styles.navLinkIcon}
            aria-hidden="true"
            focusable="false"
            title=""
          />
          {item.title}
        </Link>
      ))}
    </>
  );

  return (
    <>
      <div
        className={cx(styles.root, {
          [styles.isHome]: isHome,
          [styles.globalNavOpen]: isGlobalNavOpen,
        })}>
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
                    {activeMenuItem.icon && (
                      <Icon name={activeMenuItem.icon} title="" className={styles.currentSectionIcon} />
                    )}
                    <span>{activeMenuItem.title}</span>
                  </span>
                ) : null}
              </div>

              <nav className={styles.nav}>{primaryNav}</nav>

              <div className={styles.topEnd}>
                <SearchDialog
                  className={styles.mobileSearch}
                  triggerTheme="dark"
                  dialogTheme="light"
                  triggerVariant="compact"
                  enableKeyboardShortcut
                />

                <Button href="https://cloudsmith.com/contact/" isExternalLink className={styles.bookDemo}>
                  Book a demo
                </Button>
                <Button
                  href="https://app.cloudsmith.com/login"
                  isExternalLink
                  variant="secondary"
                  className={styles.login}
                  aria-label="Login">
                  Login
                </Button>

                <button
                  type="button"
                  className={cx(styles.menuButton, styles.light)}
                  aria-label={isGlobalNavOpen ? 'Close menu' : 'Open menu'}
                  onClick={toggle}>
                  <Icon
                    name={isGlobalNavOpen ? 'action/close' : 'menu'}
                    title=""
                    className={styles.menuIcon}
                  />
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
                      {activeMenuItem.icon && (
                        <Icon name={activeMenuItem.icon} title="" className={styles.currentSectionIcon} />
                      )}
                      <span>{activeMenuItem.title}</span>
                    </span>
                  ) : null}
                </div>

                <div className={styles.topSecondarySearch}>
                  <SearchDialog
                    className={styles.search}
                    triggerTheme="dark"
                    dialogTheme="light"
                    enableKeyboardShortcut={false}
                  />
                </div>

                <div className={cx(styles.topEnd, styles.topSecondaryEnd)}>
                  <SearchDialog
                    className={styles.mobileSearch}
                    triggerTheme="dark"
                    dialogTheme="light"
                    triggerVariant="compact"
                    enableKeyboardShortcut
                  />

                  <Button href="https://cloudsmith.com/contact/" isExternalLink className={styles.bookDemo}>
                    Book a demo
                  </Button>
                  <Button
                    href="https://app.cloudsmith.com/login"
                    isExternalLink
                    variant="secondary"
                    className={styles.login}
                    aria-label="Login">
                    Login
                  </Button>

                  <button
                    type="button"
                    className={styles.menuButton}
                    aria-label={isGlobalNavOpen ? 'Close menu' : 'Open menu'}
                    onClick={toggle}>
                    <Icon
                      name={isGlobalNavOpen ? 'action/close' : 'menu'}
                      title=""
                      className={styles.menuIcon}
                    />
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

      {navigationState === 'globalNav' ? (
        <>
          <div className={styles.mobileBackground} onClick={toggle} role="button" tabIndex={0} />

          <nav className={styles.mobileNavbar}>
            <ul className={styles.mobileNav}>
              {orderedMobileItems.map((item, i) => (
                <li
                  key={`${item.path}-${i}`}
                  className={cx(styles.mobileNavItem, {
                    [styles.mobileNavItemWithDivider]: item.title === 'Go to App',
                  })}>
                  <Link href={item.path!} className={cx(styles.mobileNavLink, 'headlineXS')}>
                    {item.title}
                    <Icon
                      name={isExternalHref(item.path) ? 'external' : 'arrowRight'}
                      className={styles.mobileNavLinkIcon}
                      aria-hidden="true"
                      focusable="false"
                      title=""
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </>
      ) : null}
    </>
  );
};
