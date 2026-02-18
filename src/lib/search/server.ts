'use server';

import { readFile } from 'fs/promises';
import path from 'path';

import { FullOptions, Searcher } from 'fast-fuzzy';

import { contentPath, loadMdxInfo } from '../markdown/util';
import { extractMdxMetadata } from '../metadata/util';
import { operationPath } from '../operations/util';
import { parseSchemas, toOperations } from '../swagger/parse';
import { SearchInput, SearchResult } from './types';

let fuzzySearcher: Searcher<SearchInput, FullOptions<SearchInput>>;

const SNIPPET_PADDING = 300;

export const performSearch = async (
  input: string,
  sections: string[] = ['documentation', 'guides', 'api'],
): Promise<SearchResult[]> => {
  if (!fuzzySearcher) {
    const items: SearchInput[] = [];

    // MDX
    for (const section of sections) {
      const files = await loadMdxInfo();
      const contents = await Promise.all(
        files.map((info) => readFile(path.join('src', 'content', info.file), 'utf8')),
      );
      for (let i = 0; i < files.length; i++) {
        const info = files[i];
        const { title } = await extractMdxMetadata(info.file, '', contents[i]);
        items.push({
          title,
          content: contents[i],
          path: contentPath(info.slug),
          section,
        });
      }
    }

    // OpenApi
    const schemas = await parseSchemas();
    const operations = toOperations(schemas);
    for (let i = 0; i < operations.length; i++) {
      const op = operations[i];
      items.push({
        title: op.title,
        content: op.description || 'Default content',
        path: operationPath(op.slug),
        section: 'api',
        method: op.method,
      });
    }

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

      // Return everything but the content attribute
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { content, ...rest } = item;

      return {
        ...rest,
        snippet,
        score: res.score,
      };
    });

  return filtered;
};
