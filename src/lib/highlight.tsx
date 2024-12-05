import { createHighlighter } from 'shiki';

export const theme = 'material-theme-palenight';

export const highlighter = createHighlighter({
  themes: [theme],
  langs: ['js', 'jsx', 'ts', 'tsx', 'json', 'text', 'bash'],
});
