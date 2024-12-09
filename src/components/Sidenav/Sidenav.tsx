import { MenuItem } from '@/lib/menu/types';
import styles from './Sidenav.module.css';
import Link from 'next/link';

const Sidenav = ({ items }: SidenavProps) => {
  return <div className={styles.root}>{items && <List items={items} />}</div>;
};

const List = ({ items }: ListProps) => {
  return (
    items && (
      <ul className={styles.list}>
        {items.map((item) => (
          <Item data={item} key={item.title} />
        ))}
      </ul>
    )
  );
};

const Item = ({ data }: ItemProps) => {
  return (
    <li>
      {data.path ? (
        <Link className={styles.link} href={data.path}>
          {data.title}
        </Link>
      ) : (
        data.title
      )}
      {data.children && <List items={data.children} />}
    </li>
  );
};

interface SidenavProps {
  items: MenuItem[] | undefined;
}
interface ListProps {
  items: MenuItem[];
}
interface ItemProps {
  data: MenuItem;
}

export default Sidenav;
