'use strict'

const HtmlWebPackPlugin  = require('html-webpack-plugin');
const ServiceWorkerWebpackPlugin = require('serviceworker-webpack-plugin');
//const MiniCssExtractPlugin = require("mini-css-extract-plugin");
//const NODE_ENV = process.env.NODE_ENV || 'development';

module.exports = {
  entry: {
    main: './public/main.js'
  },
  output: {
    path: __dirname + '/dist',
    filename: '[name].bundle.js'
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
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
        /*
        use: [
            MiniCssExtractPlugin.loader,
            'css-loader'
        ]
        */
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
            //options: { minimize: true }
          }
        ]
      },
      {
          test: /\.(png|jp(e*)g|svg)$/,  
          use: [{
              loader: 'url-loader',
              options: { 
                  limit: 1000, // Convert images < 8kb to base64 strings
                  name: 'images/[name].[ext]'
              } 
          }]
      },
      /* Пока вручную, а то и без него проблем не мало
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "eslint-loader",
        options: {
          // eslint options (if necessary)
        }
      },
      */
      {
        test: /\.xml$/,
        use: [
          {
            loader: 'fest-webpack-loader'
          }
        ]
      }
       
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./public/index.html",
      filename: "./index.html"
    }),
    new ServiceWorkerWebpackPlugin({
      entry: __dirname + '/public/sw.js',
    }),
    /*
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    })
    */
  ]
};
