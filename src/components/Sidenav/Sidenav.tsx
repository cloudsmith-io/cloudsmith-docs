'use client';

import * as m from 'motion/react-m';
import { ChevronIcon } from '@/icons/Chevron';
import { MenuItem } from '@/lib/menu/types';
import { cx } from 'class-variance-authority';
import Link from 'next/link';

import styles from './Sidenav.module.css';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { Transition } from 'motion/dist/react';

const transition: Transition = { duration: 0.35, ease: [0.55, 0, 0, 1] };

export const Sidenav = ({ items }: SidenavProps) => {
  console.log(items);
  return (
    <>
      <div className={styles.root}>{items ? <List items={items} isExpanded /> : null}</div>
    </>
  );
};

const List = ({ items, bleed, isExpanded }: ListProps) => {
  return (
    <m.ul
      className={cx(styles.list, { [styles.bleed]: bleed })}
      initial={isExpanded ? 'expanded' : 'collapsed'}
      animate={isExpanded ? 'expanded' : 'collapsed'}
      transition={transition}
      variants={{
        expanded: { opacity: 1, height: 'auto' },
        collapsed: { opacity: 0, height: 0 },
      }}>
      {items.map((item) => (
        <Item item={item} key={item.title} />
      ))}
    </m.ul>
  );
};

// TODO: Introduce this:
// const segment = useSelectedLayoutSegment();?

const Item = ({ item }: ItemProps) => {
  return (
    <li className={styles.item}>
      {item.path ? (
        <Link className={styles.link} href={item.path}>
          {item.method} {item.title}
        </Link>
      ) : (
        <span className={cx(item.isSection && styles.section)}>{item.title}</span>
      )}
      {item.children && <List items={item.children} bleed={item.isSection} />}
    </li>
  );
};

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
