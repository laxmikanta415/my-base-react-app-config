const webpack = require('webpack');
const merge = require('webpack-merge');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const path = require('path');
module.exports = env => {
  const { PLATFORM, VERSION } = env;
  console.log(PLATFORM, VERSION);
  return merge([
    {
      module: {
        rules: [
          {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader'
            }
          },
          {
            test: /\.scss$/,
            exclude: /node_modules/,
            use: [
              PLATFORM === 'production'
                ? MiniCssExtractPlugin.loader
                : 'style-loader',
              {
                loader: 'css-loader',
                options: {
                  modules: true,
                  importLoaders: 1,
                  localIdentName: '[name]_[local]_[hash:base64]',
                  camelCase: true
                }
              },
              'sass-loader'
            ]
          },
          {
            text: /\.(png|jpg|jpeg|gif)$/,
            exclude: /node_modules/,
            use: 'file-loader'
          }
        ]
      },
      entry: {
        app: './src/index.js'
      },
      devServer: {
        contentBase: './dist'
      },
      output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
      },
      plugins: [
        new CleanWebpackPlugin(['dist']),
        new HTMLWebpackPlugin({
          title: 'my html webpack',
          filename: './index.html',
          template: './src/index.html'
        }),
        new webpack.DefinePlugin({
          'process.env.VERSION': JSON.stringify(VERSION),
          'process.env.PLATFORM': JSON.stringify(PLATFORM)
        })
      ]
    }
  ]);
};
