const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const formatter = require('eslint-formatter-pretty')
const baseConfig = require('./webpack.config.base')
const { host, staticPort } = require('../../config')

const port = staticPort || 3000
const publicPath = `http://${host}:${port}/dist/`

module.exports = merge.smart(baseConfig, {
  devtool: '#cheap-module-eval-source-map',

  entry: {
    index: [
      'babel-polyfill',
      'react-hot-loader/patch',
      `webpack-dev-server/client?http://${host}:${port}/`,
      'webpack/hot/only-dev-server',
      './index.js'
    ],
  },

  output: {
    publicPath,
    filename: '[name].bundle.js'
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        enforce: 'pre',
        use: {
          loader: 'eslint-loader',
          options: { formatter }
        }
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          }
        ]
      },
      {
        test: /\.scss$/,
        use: ['style-loader',
          {
            loader: 'css-loader',
            options: { sourceMap: true },
          },
          'sass-loader',
        //   {
        //     loader: 'sass-resources-loader',
        //     options: {
        //       resources: [
        //         path.resolve(__dirname, './client/styles/variable.scss'),
        //         path.resolve(__dirname, './client/styles/mixins.scss')]
        //     }
        //   }
        ]
      }
    ]
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('local')
    }),
    new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: require('../../dist/vendor.json') // eslint-disable-line
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.LoaderOptionsPlugin({
      debug: true
    })
  ],

  devServer: {
    host,
    port,
    publicPath,
    compress: true,
    noInfo: true,
    overlay: true,
    stats: 'errors-only',
    inline: true,
    lazy: false,
    hot: true,
    headers: { 'Access-Control-Allow-Origin': '*' },
    contentBase: path.join(process.cwd(), 'dist'),
    watchOptions: {
      aggregateTimeout: 300,
      poll: 100
    },
    historyApiFallback: {
      verbose: true,
      disableDotRule: false,
    }
  }
})
