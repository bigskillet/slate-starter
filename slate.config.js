// Configuration file for all things Slate.
// https://github.com/Shopify/slate/wiki/Slate-Configuration

const path = require('path');

module.exports = {
  'cssVarLoader.liquidPath': ['src/snippets/css-variables.liquid'],
  'webpack.babel.enable': false,
  'webpack.extend': {
    resolve: {
      alias: {
        jquery: path.resolve('./node_modules/jquery'),
        'lodash-es': path.resolve('./node_modules/lodash-es'),
      },
    },
  },
  'webpack.postcss.plugins': (config) => {
    const plugins = [
      require('tailwindcss'),
      require('autoprefixer')
    ];
    if (process.env.NODE_ENV === 'production') {
      plugins.push(
        require('@fullhuman/postcss-purgecss')({
          content: ['./src/**/*.liquid'],
          defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || [],
          whitelistPatterns: [],
          whitelist: ['template-cart']
        }),
        require('cssnano')({
          preset: ['default', {
            discardComments: {
              removeAll: true
            }
          }]
        })
      )
    }
    return plugins;
  }
};
