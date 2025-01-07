import { OpenAPIV3 } from 'openapi-types';

export type Menu = { [key: string]: MenuItem };

export type MenuItem = {
  title: string;
  path?: string;
  children?: MenuItem[];
  method?: OpenAPIV3.HttpMethods;
  isSection?: boolean;
};
