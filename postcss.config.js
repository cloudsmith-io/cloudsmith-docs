/** @type {import('postcss-load-config').Config} */

export default {
  plugins: {
    'postcss-flexbugs-fixes': {},
    // This plugin adds the fluid function to CSS, which can be used to generate fluid
    // sizes for type and spacing in a more readable way. A fluid size will adapt itself
    // to the current viewport without the need for a media query.
    //
    // You can find more on this approach here:
    // https://utopia.fyi/blog/designing-with-fluid-type-scales
    '@lehoczky/postcss-fluid': {
      min: 360,
      max: 1600,
    },
    // This is used to make the custom media queries available in all
    // CSS files, so postcss-custom-media can use them.
    // TODO: Research if there is a better way to handle this
    '@csstools/postcss-global-data': {
      files: ['./src/app/_styles/breakpoints.css'],
    },
    'postcss-preset-env': {
      preserve: false,
      autoprefixer: {
        flexbox: 'no-2009',
      },
      stage: 3,
      features: {
        'custom-properties': false,
        'custom-media-queries': true,
      },
    },
  },
};
