import { createHighlighter } from 'shiki';

export const highlighter = createHighlighter({
  themes: ['github-dark'],
  langs: ['js', 'bash', 'ts', 'tsx', 'css', 'python'],
});
