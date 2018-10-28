const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.config.base')

const dist = path.resolve(process.cwd(), 'dist')

const dllConfig = {
  context: process.cwd(),

  entry: {
    /* 可以把通用的库配置到这里, 统一打包成vender_[chunkhash].js */
    vendor: [
      'babel-polyfill',
      'react',
      'react-dom',
      'react-redux',
      'react-router-dom',
      'react-router-redux',
      'redux',
    ]
  },

  output: {
    library: '[name]_[chunkhash]',
    path: dist,
    filename: '[name]_[chunkhash].js'
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'local')
    }),

    new webpack.DllPlugin({
      context: __dirname,
      path: path.join(dist, '[name].json'),
      name: '[name]_[chunkhash]'
    })
  ],
  optimization: {
    minimize: process.env.NODE_ENV === 'production'
  }
}

module.exports = merge.smart(baseConfig, dllConfig)
