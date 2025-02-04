import { createHighlighter, type Highlighter } from 'shiki';

export const theme = 'material-theme-palenight';

let highlighter: Highlighter | null = null;

export async function getHighlighter() {
  if (!highlighter) {
    highlighter = await createHighlighter({
      themes: [theme],
      langs: ['js', 'jsx', 'ts', 'tsx', 'json', 'text', 'bash', 'yaml', 'ini', 'shell', 'powershell'],
    });
  }

  return highlighter;
}
