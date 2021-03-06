const HtmlWebPackPlugin = require('html-webpack-plugin');
const ServiceWorkerWebpackPlugin = require('serviceworker-webpack-plugin');
require('babel-polyfill');
const autoprefixer = require('autoprefixer');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');

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
            //plugins: ['transform-regenerator', '@babel/plugin-proposal-object-rest-spread'],
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
            loader: 'file-loader',
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
      {
        test: /\.mp3$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'sounds/[name].[ext]',
            },
          },
        ],
      },
      {
        test: /\.ico/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
            },
          },
        ],
      },
    ],
  },
  optimization: {
    minimize: false,
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
    // кэширует результаты сборки
    new HardSourceWebpackPlugin({
      cachePrune: {
        maxAge: 0.5 * 24 * 60 * 60 * 1000, // 12 часов
        sizeThreshold: 100 * 1024 * 1024,
      },
    }),
    // распараллеливает процесс сборки
    new HardSourceWebpackPlugin.ParallelModulePlugin({
      fork: (fork, compiler, webpackBin) => fork(
        webpackBin(),
        ['--config', __filename], {
          silent: true,
        },
      ),
      // eslint-disable-next-line global-require
      numWorkers: () => require('os').cpus().length,
      minModules: 2,
    }),
  ],
};
