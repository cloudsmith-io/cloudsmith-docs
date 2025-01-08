import { getMenuItem } from '@/lib/menu/util';
import { Sidenav } from '@/components';

export const Sidebar = () => {
  const menuData = getMenuItem('documentation');
  return menuData.children ? <Sidenav items={menuData.children} /> : null;
};
