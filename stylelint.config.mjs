/** @type {import('stylelint').Config} */
const config = {
  extends: ['stylelint-config-standard', 'stylelint-config-css-modules'],
  rules: {
    'at-rule-no-unknown': true,
    'at-rule-no-vendor-prefix': true,
    'block-no-empty': true,
    'color-named': 'never',
    'color-no-invalid-hex': true,
    'rule-empty-line-before': [
      'always-multi-line',
      {
        except: ['first-nested'],
        ignore: ['after-comment'],
      },
    ],
    'declaration-block-no-duplicate-properties': true,
    'declaration-empty-line-before': [
      'always',
      { except: ['first-nested', 'after-comment'], ignore: ['after-declaration'] },
    ],
    // Preserve legacy styling patterns while still enforcing syntax correctness.
    'declaration-no-important': null,
    'declaration-property-value-disallowed-list': null,
    'declaration-property-value-no-unknown': null,
    'function-url-quotes': 'always',
    'function-no-unknown': [true, { ignoreFunctions: ['fluid'] }],
    'max-nesting-depth': 3,
    'media-feature-name-no-vendor-prefix': true,
    'no-duplicate-selectors': null,
    'property-no-vendor-prefix': true,
    'selector-class-pattern': null,
    'keyframes-name-pattern': ['^[a-z][a-zA-Z0-9]+$', { message: 'Expected keyframe name to be camelCase' }],
    'selector-max-id': 0,
    'selector-no-qualifying-type': null,
    'custom-property-pattern': null,
    'declaration-block-no-shorthand-property-overrides': null,
    'no-descending-specificity': null,
    'selector-no-vendor-prefix': true,
    'shorthand-property-no-redundant-values': true,
    'value-no-vendor-prefix': true,
  },
  ignoreFiles: ['node_modules/**/*.css'],
};

export default config;
