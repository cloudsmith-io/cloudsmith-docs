/**
 * @see https://prettier.io/docs/en/configuration.html
 * @type {import("prettier").Config}
 */
export default {
  plugins: ['@ianvs/prettier-plugin-sort-imports'],
  singleQuote: true,
  printWidth: 110,
  tabWidth: 2,
  useTabs: false,
  bracketSameLine: true,
  arrowParens: 'always',
  trailingComma: 'all',
  importOrder: [
    '',
    '^react$',
    '',
    '<TYPES>^(node:)',
    '<TYPES>',
    '<TYPES>^[.]',
    '',
    '<BUILTIN_MODULES>',
    '',
    '<THIRD_PARTY_MODULES>',
    '',
    '^@/(.*)$',
    '',
    '^[.]',
    '',
    '^(?!.*[.]css$)[./].*$',
    '',
    '.css$',
  ],
  importOrderTypeScriptVersion: '5.0.0',
  importOrderCaseSensitive: false,
};
