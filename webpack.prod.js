/* eslint-disable import/no-extraneous-dependencies */
const HtmlWebPackPlugin = require('html-webpack-plugin');
const ServiceWorkerWebpackPlugin = require('serviceworker-webpack-plugin');
require('babel-polyfill');
const autoprefixer = require('autoprefixer');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  entry: {
    polyfill: 'babel-polyfill',
    main: './public/main.js',
  },
  output: {
    path: `${__dirname}/dist`,
    filename: '[name].bundle.js',
  },
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
        test: /\.scss$/,
        use: [{
          loader: 'style-loader',
        }, {
          loader: 'css-loader',
        }, {
          loader: 'sass-loader',
          options: {
            includePaths: ['absolute/path/a', 'absolute/path/b'],
          },
        }],
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
              // parser: 'sugarss',
              // exec: true,
              plugins: [
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
              name: 'images/[name].[ext]',
            },
          },
        ],
      },
      {
        test: /\.(eot|woff|woff2|ttf|otf)$/,
        use: [
          {
            loader: 'ttf-loader',
            options: {
              name: './fonts/[name].[ext]',
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
  mode: 'production',
  optimization: {
    runtimeChunk: true,
    // выносит общие библиотеки для чанков в отдельный чанк
    // Удобно для кеширования внешних библиотек и уменьшения веса чанков
    splitChunks: {
      cacheGroups: {
        commons: {
          chunks: 'initial',
          name: 'commons',
          test: 'commons',
          enforce: true,
          minChunks: 2,
        },
      },
    },
    // минимизирует скрипты
    minimizer: [
      new UglifyJSPlugin({
        uglifyOptions: {
          warnings: false,
          parse: {},
          compress: {},
          mangle: true,
          output: null,
          toplevel: false,
          nameCache: null,
          ie8: false,
          keep_fnames: false,
        },
      }),
    ],
  },
  plugins: [
    // делает index.html и подключает в него результаты сборки
    new HtmlWebPackPlugin({
      template: './public/index.html',
      filename: './index.html',
    }),
    // делает кэш для Service Worker
    new ServiceWorkerWebpackPlugin({
      entry: `${__dirname}/public/sw.js`,
    }),
  ],
};
