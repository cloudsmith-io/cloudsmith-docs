import Link from 'next/link';

import { getMenuData } from '@/lib/menu/util';
import Sidenav from '@/components/Sidenav/Sidenav';

export function Sidebar() {
  const menuData = getMenuData('documentation');
  return <Sidenav items={menuData.children} />;
}
