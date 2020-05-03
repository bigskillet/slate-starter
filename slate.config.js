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
      require('tailwindcss')({
        purge: {
          content: ['./src/**/*.html']
        }  
      }),
      require('autoprefixer')
    ];
    if (process.env.NODE_ENV === 'production') {
      plugins.push(
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
