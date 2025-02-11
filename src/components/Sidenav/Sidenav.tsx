'use client';

import { useNavigation } from '@/app/navigation';
import { Icon } from '@/icons';
import { ArrowIcon } from '@/icons/Arrow';
import { ChevronIcon } from '@/icons/Chevron';
import { MenuItem } from '@/lib/menu/types';
import { cx } from 'class-variance-authority';
import { Transition, Variants } from 'motion/react';
import * as motion from 'motion/react-client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useState } from 'react';
import { Tag } from '../Tag';
import { getActiveAncestors } from '@/lib/menu/util';
import { last } from '@/lib/util';

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

  const isOpen = navigationState === 'sideNav';
  const toggle = () => toggleNavigation('sideNav');

  return (
    <>
      <button type="button" className={styles.toggleButton} onClick={toggle}>
        <ArrowIcon name="arrow" arrowDirection="left" as="svg" title="" className={styles.toggleIconBack} />
        <span className={styles.toggleButtonText}>{activeLabel}</span>
        <Icon name="chevronDown" as="svg" title="" className={styles.toggleIconDown} />
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
  const isCurrentPageActive = item.path === pathname && !item.children;
  const [isExpanded, setIsExpanded] = useState(isExpandedByDefault(item, pathname));

  function toggleExpand(event: React.MouseEvent<HTMLAnchorElement>) {
    // Mobile will always link to the clicked item
    if (isCurrentPageActive && window.matchMedia('(max-width: 767px)').matches) {
      event.preventDefault();
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
          <span className={styles.linkTitle}>{item.title}</span>

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

          {item.children ? (
            <ChevronIcon
              chevronDirection={isExpanded ? 'down' : 'right'}
              as="svg"
              title={isExpanded ? 'Expand icon' : 'Collapse icon'}
              className={styles.linkIcon}
              transition={openCloseTransition}
            />
          ) : null}
        </Link>
      ) : (
        <span className={styles.section}>{item.title}</span>
      )}

      {item.children ? <List items={item.children} isExpanded={isExpanded} /> : null}
    </li>
  );
};

const isExpandedByDefault = (item: MenuItem, pathname: string) => {
  // Sections are always active/open
  if (!item.path) {
    return true;
  }

  // When children or self match the browser pathname
  if (item.path === pathname || item.children?.some((child) => child.path === pathname)) {
    return true;
  }

  return false;
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
