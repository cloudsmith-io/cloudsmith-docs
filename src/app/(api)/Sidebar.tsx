import { getMenuItem } from '@/lib/menu/util';
import { Sidenav } from '@/components';
import { parseSchemas, toMenuItems, toOperations } from '@/lib/swagger/parse';

export const Sidebar = async () => {
  const menuData = getMenuItem('api');

  const schemas = await parseSchemas();
  const operations = toOperations(schemas);
  const menuItems = toMenuItems(operations);

  const allItems = [];
  if (menuData.children) allItems.push(...menuData.children);
  allItems.push({
    title: 'API',
    children: menuItems,
  });

  return <Sidenav items={allItems} />;
};
