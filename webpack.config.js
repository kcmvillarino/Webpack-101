const HTMLPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    entry: './src/app.js',
    output: {
        path: 'dist',
        filename: 'app.bundle.js'
    },
    module: {
        rules: [
           // {test: /\.scss$/, use: ExtractTextPlugin.extract(['style-loader','css-loader','sass-loader'])}
           {test: /\.scss$/, use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: ['css-loader','sass-loader'],
                    publicPath: "/dist"
           })}
        ]
    },
    plugins: [
        new HTMLPlugin({
            title: 'Project Demo',
            // minify: {
            //     collapseWhitespace: true
            // },
            hash: true,
            // Load a custom template (lodash by default see the FAQ for details)
            template: './src/index.html'
          }),
          new ExtractTextPlugin({
              filename: "app.css",
              disable: false,
              allChunks: true
          })
    ]
}