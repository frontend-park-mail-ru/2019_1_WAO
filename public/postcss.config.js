module.exports = {
  parser: 'sugarss',
  plugins: {
    'postcss-preset-env': {},
    // cssnano: {},
    'postcss-import': {},
    'postcss-cssnext': {
      browsers: ['last 2 versions', '> 5%'],
    },
  },
};
