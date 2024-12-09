import { MenuItem } from '@/lib/menu/types';
import styles from './Sidenav.module.css';
import Item from './Item';

const Sidenav = ({ items } : SidenavProps) => {
  return items && (
    <div className={styles.root}>
      {items.map(item => <Item data={item} key={item.title} />)}
    </div>
  );
};

interface SidenavProps {
  items: MenuItem[] | undefined
}

export default Sidenav;
