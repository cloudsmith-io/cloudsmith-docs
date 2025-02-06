'use server';

import path from 'path';
import { readFile } from 'fs/promises';
import { FullOptions, Searcher } from 'fast-fuzzy';

import { SearchInput, SearchResult } from './types';
import { parseSchema, toOperations } from '../swagger/parse';
import { apiOperationPath } from '../swagger/util';
import { contentPath, loadApiContentInfo, loadContentInfo } from '../markdown/util';
import { extractMdxMetadata } from '../metadata/util';

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
    for (let i = 0; i < docFiles.length; i++) {
      const info = docFiles[i];
      const { title } = await extractMdxMetadata(info.file, '', docContents[i]);
      items.push({
        title,
        content: docContents[i],
        path: contentPath(info.slug),
        section: 'documentation',
      });
    }

    // TODO: Guides

    // API swagger
    const schema = await parseSchema();
    const operations = toOperations(schema);
    for (let i = 0; i < operations.length; i++) {
      const op = operations[i];
      items.push({
        title: op.title,
        content: op.description || 'Default content',
        path: apiOperationPath(op.slug),
        section: 'api',
        method: op.method,
      });
    }

    // API MDX
    const apiFiles = await loadApiContentInfo();
    const apiContents = await Promise.all(
      apiFiles.map((info) => readFile(path.join('src', 'content', info.file), 'utf8')),
    );
    for (let i = 0; i < apiFiles.length; i++) {
      const info = apiFiles[i];
      const { title } = await extractMdxMetadata(info.file, '', docContents[i]);
      items.push({
        title,
        content: apiContents[i],
        path: contentPath(info.slug),
        section: 'api',
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

      return {
        ...item,
        snippet,
        score: res.score,
      };
    });

  return filtered;
};
