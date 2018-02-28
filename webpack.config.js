const HTMLPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
var path = require("path");

module.exports = {
    entry: {
        app: './src/app.js',
        contact: './src/contact.js'   
    },
    output: {
        //path: 'dist',
        path: path.resolve(__dirname,"dist"),
        filename: '[name].bundle.js'
    },
    module: {
        rules: [
           // {test: /\.scss$/, use: ExtractTextPlugin.extract(['style-loader','css-loader','sass-loader'])}
           {test: /\.scss$/, use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: ['css-loader','sass-loader'],
                    publicPath: "/dist"
           })},
           { test: /\.js$/, exclude: /node_modules/, use: 'babel-loader' }
        ]
    },
    devServer : {
        contentBase: path.join(__dirname, "dist"),
        compress: true,
        port: 9000,
        //open : true (for non headless environment, to open a browser)
        stats: "errors-only"
    },
    plugins: [
        new HTMLPlugin({
            title: 'Project Demo',
            // minify: {
            //     collapseWhitespace: true
            // },
            hash: true,
            excludeChunks: ['contact'],
            //filename: './../index.html/', // adding these will change the location of the file/template
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
              filename: "app.css",
              disable: false,
              allChunks: true
          })
    ]
}