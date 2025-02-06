export type SearchInput = {
  title: string;
  content: string;
  path: string;
  section: string;
  method?: string;
};

export type SearchResult = {
  title: string;
  snippet: string;
  path: string;
  section: string;
  score: number;
  method?: string;
};
