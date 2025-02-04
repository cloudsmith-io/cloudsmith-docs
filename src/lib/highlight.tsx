import { createHighlighter, type Highlighter } from 'shiki';

export const theme = 'material-theme-palenight';

export const highlighter = createHighlighter({
  themes: [theme],
  langs: ['js', 'jsx', 'ts', 'tsx', 'json', 'text', 'bash', 'yaml', 'ini'],
});

export async function getHighlighter() {
  if (!highlighter) {
    highlighter = await createHighlighter({
      themes: [theme],
      langs: ['js', 'jsx', 'ts', 'tsx', 'json', 'text', 'bash', 'yaml', 'ini', 'shell', 'powershell'],
    });
  }

  return highlighter;
}
