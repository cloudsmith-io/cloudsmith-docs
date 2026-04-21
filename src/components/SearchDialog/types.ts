import type { IconName } from '@/icons';

export type SearchSource = 'docs' | 'website';
export type SearchTriggerVariant = 'compact' | 'inline';

export interface SearchHitHierarchy {
  lvl0?: string;
  lvl1?: string;
  lvl2?: string;
  lvl3?: string;
  lvl4?: string;
  lvl5?: string;
  lvl6?: string;
}

export interface SearchRankingInfo {
  userScore?: number;
  score?: number;
}

export interface SearchHit {
  objectID?: string;
  slug?: string;
  title?: string;
  name?: string;
  category?: string;
  section?: string;
  method?: string;
  url?: string;
  url_without_anchor?: string;
  _type?: string;
  type?: string;
  documentType?: string;
  docType?: string;
  hierarchy?: SearchHitHierarchy;
  _rankingInfo?: SearchRankingInfo;
  searchSource?: SearchSource;
  [key: string]: unknown;
}

export interface SearchGroup {
  id: string;
  label: string;
  _type: string;
  hits: SearchHit[];
  count: number;
}

export interface IndexedSearchGroupItem {
  hit: SearchHit;
  index: number;
}

export interface IndexedSearchGroup {
  id: string;
  label: string;
  _type: string;
  count: number;
  items: IndexedSearchGroupItem[];
}

export interface SearchFilterDefinition {
  label: string;
  icon: IconName;
  documentType: string;
}
