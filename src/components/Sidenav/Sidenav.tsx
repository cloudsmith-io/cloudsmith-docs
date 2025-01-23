'use client';

import { useNavigation } from '@/app/navigation';
import { Icon } from '@/icons';
import { ChevronIcon } from '@/icons/Chevron';
import { MenuItem } from '@/lib/menu/types';
import { cx } from 'class-variance-authority';
import { Transition } from 'motion/dist/react';
import * as m from 'motion/react-m';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useState } from 'react';

import styles from './Sidenav.module.css';

const transition: Transition = { duration: 0.35, ease: [0.55, 0, 0, 1] };

export const Sidenav = ({ items }: SidenavProps) => {
  const { setIsOpen } = useNavigation();

  return (
    <div className={styles.root}>
      {items ? <List items={items} isExpanded /> : null}

      <button className={styles.closeButton} onClick={() => setIsOpen(false)}>
        <Icon name="close" title="" className={styles.closeIcon} />
      </button>
    </div>
  );
};

const List = ({ items, bleed, isExpanded }: ListProps) => {
  return (
    <m.div
      className={styles.listWrapper}
      initial={isExpanded ? 'expanded' : 'collapsed'}
      animate={isExpanded ? 'expanded' : 'collapsed'}
      transition={transition}
      variants={{
        expanded: { opacity: 1, height: 'auto' },
        collapsed: { opacity: 0, height: 0 },
      }}>
      <ul className={cx(styles.list, { [styles.bleed]: bleed })}>
        {items.map((item) => (
          <Item item={item} key={item.title} />
        ))}
      </ul>
    </m.div>
  );
};

const Item = ({ item }: ItemProps) => {
  const pathname = usePathname();
  const isCurrentPageActive = item.path === pathname;
  const isActive = isDescendantOrSelfActive(item, pathname);
  const [isExpanded, setIsExpanded] = useState(!item.path ? true : isActive);

  function toggleExpand(event: React.MouseEvent<HTMLAnchorElement>) {
    if (isCurrentPageActive) {
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
          {item.method && `${item.method} `}
          {item.title}

          {item.children ? (
            <ChevronIcon
              chevronDirection={isExpanded ? 'down' : 'right'}
              as="svg"
              title={isActive ? 'Expand icon' : 'Collapse icon'}
              className={styles.linkIcon}
              transition={transition}
            />
          ) : null}
        </Link>
      ) : (
        <span className={cx(item.path && styles.section)}>{item.title}</span>
      )}

      {item.children ? <List items={item.children} bleed={!!item.path} isExpanded={isExpanded} /> : null}
    </li>
  );
};

function isDescendantOrSelfActive(item: MenuItem, pathname: string) {
  // Sections are always active/open
  if (!item.path) {
    return true;
  }

  // When children or self match the browser pathname
  if (item.path === pathname || item.children?.some((child) => child.path === pathname)) {
    return true;
  }

  return false;
}

interface SidenavProps {
  items: MenuItem[];
}

interface ListProps {
  items: MenuItem[];
  bleed?: boolean;
  isExpanded?: boolean;
}

interface ItemProps {
  item: MenuItem;
}
