export type SearchInput = {
  title: string;
  content: string;
  path: string;
  section: string;
};

export type SearchResult = {
  title: string;
  snippet: string;
  path: string;
  section: string;
  score: number;
};
