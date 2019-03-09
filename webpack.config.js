'use strict'

const HtmlWebPackPlugin  = require('html-webpack-plugin');
//const MiniCssExtractPlugin = require("mini-css-extract-plugin");
//const NODE_ENV = process.env.NODE_ENV || 'development';

module.exports = {
  entry: {
    main: './public/main.js'
  },
  output: {
    path: __dirname + '/public/dist',
    filename: '[name].bundle.js'
  },  

  module: {
    rules: [
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
                  limit: 8000, // Convert images < 8kb to base64 strings
                  name: 'images/[name].[ext]'
              } 
          }]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "eslint-loader",
        options: {
          // eslint options (if necessary)
        }
      }
       
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./public/index.html",
      filename: "./index.html"
    }),
    /*
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    })
    */
  ]
};
