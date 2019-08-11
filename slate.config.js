// Configuration file for all things Slate.
// https://github.com/Shopify/slate/wiki/Slate-Configuration

const path = require('path');

module.exports = {
  'cssVarLoader.liquidPath': ['src/snippets/css-variables.liquid'],
  'webpack.extend': {
    resolve: {
      alias: {
        jquery: path.resolve('./node_modules/jquery'),
        'lodash-es': path.resolve('./node_modules/lodash-es'),
      },
    },
  },
  'webpack.postcss.plugins': [
    require('tailwindcss')({
      theme: {
        extend: {}
      },
      variants: {},
      plugins: []
    }),
    ...process.env.NODE_ENV === 'production'
      ? [
        require('cssnano'),
        require('@fullhuman/postcss-purgecss')({
          content: ['./src/**/*.html'],
          defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || []
        })
      ] : []
  ]
};
