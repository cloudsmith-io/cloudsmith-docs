'use client';

import { cx } from 'class-variance-authority';
import Link from 'next/link';

import { MenuItem } from '@/lib/menu/types';

import styles from './Sidenav.module.css';
import { Icon } from '@/icons';

export const Sidenav = ({ items }: SidenavProps) => {
  return (
    <>
      <Icon name="chevron" as="symbol" title="Chevron" />
      <div className={styles.root}>{items ? <List items={items} /> : null}</div>
    </>
  );
};

const List = ({ items, bleed }: ListProps) => {
  return (
    <ul className={cx(styles.list, { [styles.bleed]: bleed })}>
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
        <>
          <Link className={styles.link} href={data.path}>
            {data.title}
            <Icon name="chevronDown" as="svg" title="Chevron" className={styles.linkIcon} />
          </Link>
        </>
      ) : (
        <span className={styles.section}>{data.title}</span>
      )}

      {data.children ? <List items={data.children} bleed={!data.path} /> : null}
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
