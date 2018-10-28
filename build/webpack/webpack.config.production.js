const fs = require('fs')
const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.config.base')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const commonExtractCss = new ExtractTextPlugin('[name].common.[hash].css')
const projectExtractCss = new ExtractTextPlugin('[name].[hash].css')

const sourceMap = false

module.exports = merge.smart(baseConfig, {
  devtool: sourceMap ? 'cheap-source-map' : false,
  mode: 'production',

  entry: {
    index: [
      'babel-polyfill',
      './index.js'
    ]
  },

  output: {
    publicPath: ''
  },

  module: {
    rules: [
      // 公共css
      {
        test: /\.css$/,
        exclude: [path.resolve(process.cwd(), './src')],
        use: commonExtractCss.extract({
          use: [
            {
              loader: 'css-loader',
              options: {
                minimize: true,
                sourceMap
              }
            }
          ],
          fallback: 'style-loader'
        })
      },
      // 项目css
      {
        test: /\.css$/,
        include: [path.resolve(process.cwd(), './src')],
        use: projectExtractCss.extract({
          use: [
            {
              loader: 'css-loader',
              options: {
                minimize: true,
                sourceMap
              }
            }
          ],
          fallback: 'style-loader'
        })
      },
      {
        test: /\.scss$/,
        use: projectExtractCss.extract({
          use: [
            {
              loader: 'css-loader',
              options: {
                minimize: true,
                sourceMap
              }
            }
          ],
          fallback: 'style-loader'
        })
      },
    ]
  },

  plugins: [
    // NODE_ENV should be production so that modules do not perform certain development checks
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new webpack.DllReferencePlugin({
      context: process.cwd(),
      manifest: require('../../dist/vendor.json') // eslint-disable-line
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: process.env.ANALYZER ? 'server' : 'disabled',
      analyzerHost: '127.0.0.1',
      analyzerPort: 9999,
      reportFilename: 'report.html',
      openAnalyzer: !!process.env.ANALYZER,
      logLevel: 'info'
    }),
    commonExtractCss,
    projectExtractCss,
    // custom plugin for output stats.json
    function custom() {
      this.plugin('done', (stats) => {
        fs.writeFileSync('./dist/assets.json', JSON.stringify(stats.toJson().assets))
      })
    }
  ],
  optimization: {
    minimize: process.env.NODE_ENV === 'production'
  }
})

