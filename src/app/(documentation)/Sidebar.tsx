import { getMenuData } from '@/lib/menu/util';
import { Sidenav } from '@/components';

export function Sidebar() {
  const menuData = getMenuData('documentation');
  return <Sidenav items={menuData.children} />;
}
