// Configuration file for all things Slate.
// https://github.com/Shopify/slate/wiki/Slate-Configuration

const path = require('path');

const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const purgecss = require('@fullhuman/postcss-purgecss');
const tailwindcss = require('tailwindcss');

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
  'webpack.postcss.plugins': (config) => {
    const plugins = [
      tailwindcss({
        theme: {
          extend: {}
        },
        variants: {},
        plugins: []  
      }),
      autoprefixer
    ];
    if (process.env.NODE_ENV === 'production') {
      plugins.push(
        purgecss({
          content: ['./src/**/*.liquid'],
          defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || [],
          whitelistPatterns: [],
          whitelist: []
        }),
        cssnano({
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
