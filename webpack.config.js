const HTMLPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
var webpack = require('webpack')
var path = require('path')

var isProd = process.env.NODE_ENV === 'production' // true or false
var cssDev = ['style-loader', 'css-loader', 'sass-loader']
var cssProd = ExtractTextPlugin.extract({
  fallback: 'style-loader',
  use: ['css-loader', 'sass-loader'],
  publicPath: '/dist'
})
var cssConfig = isProd ? cssProd : cssDev

module.exports = {
  entry: {
    app: './src/app.js',
    contact: './src/contact.js'
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

      }
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
      filename: 'app.css',
      disable: !isProd,
      allChunks: true
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      //
    })
  ]
}
