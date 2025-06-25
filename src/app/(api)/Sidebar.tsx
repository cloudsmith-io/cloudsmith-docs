import { getMenuItem } from '@/lib/menu/util';
import { Sidenav } from '@/components';
import { parseSchema, toMenuItems, toOperations } from '@/lib/swagger/parse';

export const Sidebar = async () => {
  const menuData = getMenuItem('api');

  // Load and process both schemas in parallel for better performance
  const [schemaV3, schemaV2] = await Promise.all([
    parseSchema('v3'),
    parseSchema('v2'),
  ]);

  // Process V3 operations and menu items
  const operationsV3 = toOperations(schemaV3, 'v3');
  const menuItemsV3 = toMenuItems(operationsV3);

  // Process V2 operations and menu items
  const operationsV2 = toOperations(schemaV2, 'v2');
  const menuItemsV2 = toMenuItems(operationsV2);

  // Build the final menu structure
  const allItems = [];
  if (menuData?.children) {
    allItems.push(...menuData.children);
  }

  // Add versioned API menus
  allItems.push(
    {
      title: 'API v3',
      children: menuItemsV3,
    },
    {
      title: 'API v2',
      children: menuItemsV2,
    },
  );

  return <Sidenav items={allItems} />;
};
