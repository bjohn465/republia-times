/* eslint-disable flowtype/require-valid-file-annotation */
require('dotenv').config()

const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const webpack = require('webpack')

// eslint-disable-next-line immutable/no-mutation
module.exports = function getWebpackConfig () {
  const { NODE_ENV } = process.env
  const isProduction = NODE_ENV === 'production'
  const GIT_REVISION = require('child_process')
    .execSync('git rev-parse HEAD').toString()
  const options = {
    context: path.resolve(__dirname, 'src'),
    entry: {
      app: [ './index' ],
      vendor: [ 'react', 'react-dom' ]
    },
    output: {
      path: path.join(__dirname, 'build'),
      filename: '[name].[hash].js',
      chunkFilename: '[name].[hash].js',
      publicPath: '/'
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: (file) => (
            file.includes('node_modules')
          ),
          loader: 'babel-loader',
          options: {
            cacheDirectory: true
          }
        },
        {
          test: /\.css$/,
          exclude: (file) => (
            file.includes('node_modules')
          ),
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
              {
                loader: 'css-loader',
                options: {
                  modules: true,
                  getLocalIdent: getLocalIdent(isProduction),
                  importLoaders: 1,
                  sourceMap: true
                }
              },
              'postcss-loader'
            ]
          })
        },
        {
          test: /node_modules.*\.css$/,
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: 'css-loader'
          })
        },
        {
          test: /\.json$/,
          loader: 'json-loader'
        },
        {
          test: /\.(png|gif|jpe?g|svg)$/,
          loader: 'url-loader?limit=10000'
        },
        {
          test: /\.(svg|eot|otf|ttf|woff2?)$/,
          loader: 'file-loader'
        }
      ]
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify(NODE_ENV),
          GIT_REVISION: JSON.stringify(GIT_REVISION)
        }
      }),
      new ExtractTextPlugin({
        allChunks: true,
        filename: '[name].[hash].css',
        ignoreOrder: true
      }),
      new HtmlWebpackPlugin({
        chunksSortMode: 'dependency',
        filename: 'index.html',
        inject: true,
        template: 'index.html',
        minify: {
          collapseWhitespace: true,
          removeAttributeQuotes: true,
          removeScriptTypeAttributes: true,
          removeOptionalTags: true
        }
      }),
      new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        filename: '[name].[hash].js'
      })
    ]
  }

  if (isProduction) {
    Object.assign(options, {
      bail: true,
      devtool: 'source-map',
      plugins: [
        new webpack.optimize.OccurrenceOrderPlugin(true),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.optimize.UglifyJsPlugin({
          sourceMap: true,
          compress: {
            screw_ie8: true,
            unsafe: true,
            warnings: false
          },
          mangle: {
            screw_ie8: true
          }
        }),
        ...options.plugins
      ]
    })
  } else {
    Object.assign(options, {
      devtool: 'inline-source-map',
      cache: true,
      output: Object.assign(options.output, {
        pathinfo: true
      }),
      devServer: {
        compress: true,
        historyApiFallback: {
          index: options.output.publicPath
        },
        host: '0.0.0.0',
        inline: true,
        noInfo: true,
        port: 8000
      }
    })
  }

  return options
}

function getLocalIdent (isProduction) {
  // incremented class names
  const classes = new Map()
  let classIndex = 0

  function toEmoji (n) {
    const lo = 0x1F300
    const hi = 0x1F9D0
    const delta = hi - lo
    const emojis = []
    do {
      emojis.push(String.fromCodePoint(lo + (n % delta)))
      n = Math.floor(n / delta)
    } while (n > 0)
    return emojis.join('')
  }

  return (context, localIdentName, localName) => {
    const key = context.resourcePath + '.' + localName
    if (!classes.has(key)) {
      classes.set(key, isProduction
        ? `_${classIndex.toString(36)}`
        : `${localName}${toEmoji(classIndex)}`)
      classIndex += 1
    }
    return classes.get(key)
  }
}
