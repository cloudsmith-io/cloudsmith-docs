import { getMenuItem } from '@/lib/menu/util';
import { Sidenav } from '@/components';
import { parseSchema, toMenuItems, toOperations } from '@/lib/swagger/parse';

export const Sidebar = async () => {
  const menuData = getMenuItem('api');

  const schema = await parseSchema();
  const operations = toOperations(schema);
  const menuItems = toMenuItems(operations);

  const allItems = [];
  if (menuData.children) allItems.push(...menuData.children);
  allItems.push({
    title: 'API',
    children: menuItems,
  });

  return <Sidenav items={allItems} />;
};
