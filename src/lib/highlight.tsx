import { createHighlighter, type Highlighter } from 'shiki';

export const theme = 'github-dark-default';

let highlighter: Highlighter | null = null;

export async function getHighlighter() {
  if (!highlighter) {
    highlighter = await createHighlighter({
      themes: [theme],
      langs: [
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
        'csv'
      ],
    });
  }

  return highlighter;
}
