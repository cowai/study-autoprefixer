const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin')

// 複数のエントリーポイントで共用されるコードを持ったモジュールを別途生成
const extractCommons = new webpack.optimize.CommonsChunkPlugin({
  name: 'commons',
  filename: './scripts/commons.js'
})


const config = {
  context: path.resolve(__dirname, 'src'),

  entry: {
    app: './scripts/app.js',
    admin: './scripts/admin.js'
  },

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: './scripts/[name].bundle.js'
  },

  module: {
    rules: [{
        test: /\.js$/,
        include: path.resolve(__dirname, 'src'),
        use: [{
          loader: 'babel-loader',
          options: {
            presets: [
              ['es2015', {
                modules: false
              }]
            ]
          }
        }]
      },
      {
        test: /\.(png|jpg)$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 10000
          }
        }]
      },
      {
        test: /\.(css|scss)$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            'css-loader',
            'sass-loader',
            'postcss-loader'
          ]
        })
      }
    ]
  },

  plugins: [
    new webpack.LoaderOptionsPlugin({
      options: {
        postcss: [
          require('autoprefixer')({
            browsers: ['last 2 versions']
          })
        ]
      }
    }),
    new ExtractTextPlugin({
      filename: '[name].[hash].css',
      disable: false,
      allChunks: true
    }),
    extractCommons
  ]
};

module.exports = config;