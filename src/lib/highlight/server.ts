import type { Highlighter } from 'shiki';

import { createHighlighter } from 'shiki';

import { theme } from './theme';

let highlighter: Highlighter | null = null;

export async function getHighlighter() {
  if (!highlighter) {
    highlighter = await createHighlighter({
      themes: [theme],
      langs: [
        () => import('../lang/rego.json'),
        'js',
        'jsx',
        'ts',
        'tsx',
        'json',
        'text',
        'bash',
        'yaml',
        'ini',
        'shell',
        'powershell',
        'toml',
        'r',
        'groovy',
        'kotlin',
        'xml',
        'scala',
        'python',
        'scss',
        'ruby',
        'csv',
      ],
    });
  }

  return highlighter;
}
