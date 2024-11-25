import prettier from 'prettier';

import config from '../../prettier.config';

// Prettier formatter with TypeScript parser
export const prettierFormatter = (content: string, options: Parameters<typeof prettier.format>[1] = {}) =>
  prettier.format(content, {
    parser: 'typescript',
    ...config,
    ...options,
  });
