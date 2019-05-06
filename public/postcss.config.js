module.exports = {
  parser: 'sugarss',
  plugins: {
    'postcss-preset-env': {
      stage: 1,
      features: ['css-nesting'],
    },
    // cssnano: {},
    // cssnext: {},
    'postcss-import': {},
    'postcss-cssnext': {
      browsers: ['last 2 versions', '> 5%'],
    },
  },
};
