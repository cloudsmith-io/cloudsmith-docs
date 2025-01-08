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
        <Item data={item} key={item.title} />
      ))}
    </m.ul>
  );
};

const Item = ({ data }: ItemProps) => {
  const pathname = usePathname();
  const [isExpanded, setIsExpanded] = useState(pathname === data.path);

  function toggleExpand(event: React.MouseEvent<SVGElement>) {
    if (pathname === data.path) {
      setIsExpanded(!isExpanded);
      event.preventDefault();
    }
  }

  return (
    <li className={styles.item}>
      {data.path ? (
        <Link className={styles.link} href={data.path}>
          {data.title}({isExpanded ? 'down' : 'up'})
          <ChevronIcon
            onClick={toggleExpand}
            chevronDirection={isExpanded ? 'down' : 'up'}
            as="svg"
            title="Chevron"
            className={styles.linkIcon}
            transition={transition}
          />
        </Link>
      ) : (
        <span className={styles.section}>{data.title}</span>
      )}

      {data.children ? <List items={data.children} bleed={!data.path} isExpanded={isExpanded} /> : null}
    </li>
  );
};

interface SidenavProps {
  items: MenuItem[] | undefined;
}

interface ListProps {
  items: MenuItem[];
  bleed?: boolean;
  isExpanded?: boolean;
}

interface ItemProps {
  data: MenuItem;
}
