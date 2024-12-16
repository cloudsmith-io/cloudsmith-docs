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
        <Item data={item} key={item.title} />
      ))}
    </ul>
  );
};

const Item = ({ data }: ItemProps) => {
  return (
    <li className={styles.item}>
      {data.path ? (
        <Link className={styles.link} href={data.path}>
          {data.title}
        </Link>
      ) : (
        <span className={styles.section}>{data.title}</span>
      )}
      {data.children && <List items={data.children} bleed={!data.path} />}
    </li>
  );
};

interface SidenavProps {
  items: MenuItem[] | undefined;
}
interface ListProps {
  items: MenuItem[];
  bleed?: boolean;
}
interface ItemProps {
  data: MenuItem;
}
