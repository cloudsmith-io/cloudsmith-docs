import Link from 'next/link';

import type { MenuItem } from '@/lib/menu/types';
import { getMenuData } from '@/lib/menu/util';

// TODO: We will need to make shared components that can help render the
// sidebar and items for both desktop and mobile in a streamlined way.
// This is just a placeholder.
function Item({ data }: { data: MenuItem }) {
  let subList = null;
  if (data.children) {
    subList = (
      <ul>
        {data.children.map((child) => (
          <li key={child.title}>
            <Item data={child} />
          </li>
        ))}
      </ul>
    );
  }

  return (
    <div>
      {data.path ? <Link href={data.path}>{data.title}</Link> : data.title}
      {subList}
    </div>
  );
}

export function Sidebar() {
  const menuData = getMenuData('documentation');
  return <Item data={menuData} />;
}
