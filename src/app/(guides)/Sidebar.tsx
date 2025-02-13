import { getMenuItem } from '@/lib/menu/util';
import { Sidenav } from '@/components';

export const Sidebar = async () => {
  const menuData = getMenuItem('guides');
  return menuData.children ? <Sidenav items={menuData.children} /> : null;
};
