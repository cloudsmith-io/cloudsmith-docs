'use client';

import Link from 'next/link';
import { cx } from 'class-variance-authority';

import { MenuItem } from '@/lib/menu/types';

import styles from './Sidenav.module.css';

export const Sidenav = ({ items }: SidenavProps) => {
  return <div className={styles.root}>{items && <List items={items} />}</div>;
};

const List = ({ items, bleed }: ListProps) => {
  return (
    <ul className={cx(styles.list, bleed && styles.bleed)}>
      {items.map((item) => (
        <Item item={item} key={item.title} />
      ))}
    </ul>
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
}
interface ItemProps {
  item: MenuItem;
}
