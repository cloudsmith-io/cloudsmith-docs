import { Method } from '@/components/Method';

export type Menu = { [key: string]: MenuItem };

export type MenuItem = {
  title: string;
  path?: string;
  children?: MenuItem[];
  method?: Method.Methods;
};
