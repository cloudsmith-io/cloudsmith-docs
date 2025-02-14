import { OpenAPIV3 } from 'openapi-types';

export type SearchInput = {
  title: string;
  content: string;
  path: string;
  section: string;
  method?: OpenAPIV3.HttpMethods;
};

export type SearchResult = {
  title: string;
  snippet: string;
  path: string;
  section: string;
  score: number;
  method?: OpenAPIV3.HttpMethods;
};
