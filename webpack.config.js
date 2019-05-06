const HtmlWebPackPlugin = require('html-webpack-plugin');
const ServiceWorkerWebpackPlugin = require('serviceworker-webpack-plugin');
require('babel-polyfill');
const autoprefixer = require('autoprefixer');
const postcssNesting = require('postcss-nesting');

module.exports = {
  entry: {
    polyfill: 'babel-polyfill',
    main: './public/main.js',
  },
  output: {
    path: `${__dirname}/dist`,
    filename: '[name].bundle.js',
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ['transform-regenerator'],
          },
        },
      },
      {
        test: /\.css$/,
        // use: ['style-loader', 'css-loader'],
        use: [
          'style-loader',
          { loader: 'css-loader', options: { importLoaders: 1 } },
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [
                autoprefixer({
                  browsers: ['ie >= 8', 'last 4 version'],
                }),
              ],
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
          },
        ],
      },
      {
        test: /\.(png|jp(e*)g|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10, // Convert images < 8kb to base64 strings
              name: 'images/[name].[ext]',
            },
          },
        ],
      },
      {
        test: /\.hbs$/,
        loader: 'handlebars-loader',
      },
    ],
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: './public/index.html',
      filename: './index.html',
    }),
    new ServiceWorkerWebpackPlugin({
      entry: `${__dirname}/public/sw.js`,
    }),
  ],
};
