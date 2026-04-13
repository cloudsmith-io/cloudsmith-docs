'use client';

import React, { useEffect, useState } from 'react';

import { cx } from 'class-variance-authority';
import { Transition, Variants } from 'motion/react';
import * as motion from 'motion/react-client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { useNavigation } from '@/app/navigation';
import { Icon } from '@/icons';
import { ChevronSmallIcon } from '@/icons/ChevronSmall';
import { MenuItem } from '@/lib/menu/types';
import { getActiveAncestors } from '@/lib/menu/util';
import { last } from '@/lib/util';

import { Tag } from '../Tag';
import styles from './Sidenav.module.css';

const togglerTransition: Transition = { duration: 0.2, ease: 'easeInOut' };
const openCloseTransition: Transition = { duration: 0.35, ease: [0.55, 0, 0, 1] };
const openCloseVariants: Variants = {
  expanded: { opacity: 1, height: 'auto' },
  collapsed: { opacity: 0, height: 0 },
};

export const Sidenav = ({ items }: SidenavProps) => {
  const { navigationState, toggleNavigation } = useNavigation();
  const pathname = usePathname();
  const activeMenuItems = getActiveAncestors(pathname, items);
  const activeLabel = last(activeMenuItems)?.title ?? 'Select page';

  useEffect(() => {
    document.body.classList.add('has-sidenav-toggle');

    return () => {
      document.body.classList.remove('has-sidenav-toggle');
    };
  }, []);

  const isOpen = navigationState === 'sideNav';
  const toggle = () => toggleNavigation('sideNav');

  return (
    <>
      <button type="button" className={styles.toggleButton} onClick={toggle}>
        <span className={cx(styles.toggleButtonText, 'monoMUppercase')}>{activeLabel}</span>
        <Icon
          name="chevronDown"
          as="svg"
          title=""
          className={cx(styles.toggleIconDown, { [styles.toggleIconDownOpen]: isOpen })}
        />
      </button>

      <motion.div
        className={styles.root}
        initial={{ height: 0, opacity: 0 }}
        animate={{
          height: isOpen ? 'auto' : 0,
          opacity: isOpen ? 1 : 0,
        }}
        transition={togglerTransition}>
        <div className={styles.wrapper}>{items ? <List items={items} isExpanded /> : null}</div>
      </motion.div>
    </>
  );
};

const List = ({ items, isExpanded }: ListProps) => {
  return (
    <motion.div
      className={styles.listWrapper}
      initial={isExpanded ? 'expanded' : 'collapsed'}
      animate={isExpanded ? 'expanded' : 'collapsed'}
      transition={openCloseTransition}
      variants={openCloseVariants}>
      <ul className={styles.list}>
        {items.map((item, i) => (
          <Item item={item} key={`${item.title}-${i}`} />
        ))}
      </ul>
    </motion.div>
  );
};

const Item = ({ item }: ItemProps) => {
  const pathname = usePathname();
  const { setNavigationState } = useNavigation();
  const isCurrentPageActive = item.path === pathname && !item.children;
  const shouldBeExpanded = isExpandedByDefault(item, pathname);
  const [isExpanded, setIsExpanded] = useState(shouldBeExpanded);

  useEffect(() => {
    setIsExpanded(shouldBeExpanded);
  }, [shouldBeExpanded]);

  function toggleExpand(event: React.MouseEvent<HTMLAnchorElement>) {
    const isMobileViewport = window.matchMedia('(max-width: 767px)').matches;

    // Mobile will always link to the clicked item
    if (isCurrentPageActive && isMobileViewport) {
      event.preventDefault();
    }

    if (isMobileViewport && !isCurrentPageActive) {
      event.currentTarget.blur();
      setNavigationState('closed');
    }

    setIsExpanded((isExpanded) => !isExpanded);
  }

  return (
    <li className={styles.item}>
      {item.path ? (
        <Link
          className={cx(styles.link, { [styles.linkActive]: isCurrentPageActive })}
          href={item.path}
          onClick={toggleExpand}>
          {item.children ? (
            <ChevronSmallIcon
              chevronDirection={isExpanded ? 'down' : 'right'}
              as="svg"
              size="small"
              title={isExpanded ? 'Expand icon' : 'Collapse icon'}
              className={styles.linkIcon}
              transition={openCloseTransition}
            />
          ) : (
            <div className={styles.emptyIcon} />
          )}

          <div className={cx(styles.linkTitle, 'bodyS')}>{item.title}</div>

          {item.method ? (
            <Tag
              method={item.method}
              size="small"
              className={styles.linkTag}
              active={isCurrentPageActive}
              mobileDarkMode>
              {item.method}
            </Tag>
          ) : null}
        </Link>
      ) : (
        <span className={cx(styles.section, 'monoXSUppercase')}>{item.title}</span>
      )}

      {item.children ? <List items={item.children} isExpanded={isExpanded} /> : null}
    </li>
  );
};

const isExpandedByDefault = (item: MenuItem, pathname: string) => {
  if (!item.path) {
    return true;
  }

  return getActiveAncestors(pathname, [item]).length > 0;
};

interface SidenavProps {
  items: MenuItem[];
}

interface ListProps {
  items: MenuItem[];
  isExpanded?: boolean;
}

interface ItemProps {
  item: MenuItem;
}
