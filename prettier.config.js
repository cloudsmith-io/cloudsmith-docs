/**
 * @see https://prettier.io/docs/en/configuration.html
 * @type {import("prettier").Config}
 */
export default {
  //plugins: ["@trivago/prettier-plugin-sort-imports"],
  singleQuote: true,
  printWidth: 110,
  tabWidth: 2,
  useTabs: false,
  bracketSameLine: true,
  arrowParens: "always",
  trailingComma: "all",
  importOrder: [
    "^react$",
    "<THIRD_PARTY_MODULES>",
    "^@/(.*)$",
    "^[./](?!.*\\.(module\\.css|css)$)",
    "^[./]"
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true
};