const HTMLPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const webpack = require('webpack')
const path = require('path')
const bootstrapEntryPoints = require('./webpack.bootstrap.config')
const glob = require('glob')
const PurifyCSSPlugin = require('purifycss-webpack')
const isProd = process.env.NODE_ENV === 'production' // true or false
const cssDev = ['style-loader', 'css-loader', 'sass-loader']
const cssProd = ExtractTextPlugin.extract({
  fallback: 'style-loader',
  use: ['css-loader', 'sass-loader'],
  publicPath: '/dist'
})
const cssConfig = isProd ? cssProd : cssDev
const bootstrapConfig = isProd ? bootstrapEntryPoints.prod : bootstrapEntryPoints.dev

module.exports = {
  entry: {
    app: './src/app.js',
    contact: './src/contact.js',
    bootstrap: bootstrapConfig
  },
  output: {
    // path: 'dist',
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js'
  },
  module: {
    rules: [
      // {test: /\.scss$/, use: ['style-loader','css-loader','sass-loader']},
      {
        test: /\.scss$/,
        use: cssConfig
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.(jpg|svg|png)$/,
        use: 'file-loader?name=[name].[ext]&outputPath=img/'

      },
      { test: /\.(woff2?|svg)$/, loader: 'url-loader?limit=10000&name=fonts/[name].[ext]' },
      { test: /\.(ttf|eot)$/, loader: 'file-loader?name=fonts/[name].[ext]' },
      { test: /bootstrap-sass[\/\\]assets[\/\\]javascripts[\/\\]/, loader: 'imports-loader?jQuery=jquery' }
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000,
    hot: true,
    // open : true (for non headless environment, to open a browser)
    stats: 'errors-only'
  },
  plugins: [
    new HTMLPlugin({
      title: 'Project Demo',
      // minify: {
      //     collapseWhitespace: true
      // },
      hash: true,
      excludeChunks: ['contact'],
      // filename: './../index.html/', // adding these will change the location of the file/template
      // Load a custom template (lodash by default see the FAQ for details)
      template: './src/index.html'
    }),
    new HTMLPlugin({
      title: 'Contact Page Demo',
      hash: true,
      chunks: ['contact'],
      filename: 'contact.html',
      template: './src/contact.html'
    }),
    new ExtractTextPlugin({
      filename: '/css/[name].css',
      disable: !isProd,
      allChunks: true
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      //
    }),
    // new PurifyCSSPlugin({
    //   // Give paths to parse for rules. These should be absolute!
    //   paths: glob.sync(path.join(__dirname, '.src/*.html'))
    // })
  ]
}
