'use server';

import path from 'path';
import { readFile } from 'fs/promises';
import { FullOptions, MatchData, Searcher } from 'fast-fuzzy';

import { SearchInput, SearchResult } from './types';
import { parseSchema, toOperations } from '../swagger/parse';
import { apiOperationPath } from '../swagger/util';
import { contentPath, loadApiContentInfo, loadContentInfo } from '../markdown/util';

let fuzzySearcher: Searcher<SearchInput, FullOptions<SearchInput>>;

const SNIPPET_PADDING = 30;

export const performSearch = async (
  input: string,
  sections: string[] = ['documentation', 'guides', 'api'],
): Promise<SearchResult[]> => {
  if (!fuzzySearcher) {
    const items: SearchInput[] = [];

    // Documentation MDX
    const docFiles = await loadContentInfo();
    const docContents = await Promise.all(
      docFiles.map((info) => readFile(path.join('src', 'content', info.file), 'utf8')),
    );
    docFiles.forEach((info, i) =>
      items.push({
        title: 'Find title',
        content: docContents[i],
        path: contentPath(info.slug),
        section: 'documentation',
      }),
    );

    // TODO: Guides

    // API swagger
    const schema = await parseSchema();
    const operations = toOperations(schema);
    operations.forEach((op) =>
      items.push({
        title: op.title,
        content: op.description || 'Default content',
        path: apiOperationPath(op.slug),
        section: 'api',
      }),
    );

    // API MDX
    const apiFiles = await loadApiContentInfo();
    const apiContents = await Promise.all(
      apiFiles.map((info) => readFile(path.join('src', 'content', info.file), 'utf8')),
    );
    apiFiles.forEach((info, i) =>
      items.push({
        title: 'Find title',
        content: apiContents[i],
        path: contentPath(info.slug),
        section: 'api',
      }),
    );

    fuzzySearcher = new Searcher(items, { keySelector: (item) => item.content });
  }

  // Search and parse result into search result type
  const results = fuzzySearcher.search(input, { returnMatchData: true });
  const filtered: SearchResult[] = results
    .filter((res) => sections.includes(res.item.section))
    .map((res) => {
      const { match, item } = res;

      const snippetStart = Math.max(0, match.index - SNIPPET_PADDING);
      const snippetEnd = Math.min(item.content.length, match.index + match.length + SNIPPET_PADDING);
      const snippet = item.content
        .substring(snippetStart, snippetEnd)
        .replace(/[^0-9a-z-A-Z \.\:]/g, '')
        .replace(/ +/, ' ');

      return {
        title: item.title,
        path: item.path,
        section: item.section,
        snippet,
        score: res.score,
      };
    });

  return filtered;
};
