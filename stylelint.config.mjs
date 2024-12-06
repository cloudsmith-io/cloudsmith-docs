/** @type {import('stylelint').Config} */
export default {
  extends: ["stylelint-config-standard"],
  rules: {
    "at-rule-no-unknown": true,
    "at-rule-no-vendor-prefix": true,
    "block-no-empty": true,
    "color-named": "never",
    "color-no-invalid-hex": true,
    "rule-empty-line-before": false,
    "declaration-block-no-duplicate-properties": true,
    "declaration-empty-line-before": [
      "always",
      { except: ["first-nested", "after-comment"], ignore: ["after-declaration"] }
    ],
    "declaration-no-important": true,
    "declaration-property-value-disallowed-list": { "/^border/": ["none"] },
    "function-url-quotes": "always",
    "function-no-unknown": [true, { ignoreFunctions: ["fluid"] }],
    "max-nesting-depth": 3,
    "media-feature-name-no-vendor-prefix": true,
    "no-duplicate-selectors": true,
    "property-no-vendor-prefix": true,
    "selector-class-pattern": [
      "^[a-z][a-zA-Z0-9]+$",
      { message: "Expected class selector to be camelCase" }
    ],
    "keyframes-name-pattern": [
      "^[a-z][a-zA-Z0-9]+$",
      { message: "Expected keyframe name to be camelCase" }
    ],
    "selector-max-id": 0,
    "selector-no-qualifying-type": true,
    "selector-no-vendor-prefix": true,
    "shorthand-property-no-redundant-values": true,
    "value-no-vendor-prefix": true,
    "selector-pseudo-class-no-unknown": [
      true,
      {
        "ignorePseudoClasses": ["global"]
      }
    ],
  },
  ignoreFiles: ["node_modules/**/*.css"]
};
