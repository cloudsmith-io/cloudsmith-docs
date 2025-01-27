'use server';

import { FullOptions, MatchData, Searcher } from 'fast-fuzzy';

import { SearchItem } from './types';
import { parseSchema, toOperations } from '../swagger/parse';
import { apiOperationPath } from '../swagger/util';

let fuzzySearcher: Searcher<SearchItem, FullOptions<SearchItem>>;

export const performSearch = async (input: string): Promise<MatchData<SearchItem>[]> => {
  if (!fuzzySearcher) {
    // Swagger
    const schema = await parseSchema();
    const operations = toOperations(schema);
    const apiItems: SearchItem[] = operations.map((op) => ({
      title: op.summary || 'Default title',
      content: op.description || 'Default content',
      path: apiOperationPath(op.slug),
    }));

    // MDX
    const mdxItems: SearchItem[] = [];

    // Fuzzy searcher
    const items: SearchItem[] = apiItems.concat(mdxItems);
    fuzzySearcher = new Searcher(items, { keySelector: (item) => item.content });
  }

  return fuzzySearcher.search(input, { returnMatchData: true });
};
