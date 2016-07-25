var fs = require('fs');
var path = require('path');
var webpack = require('webpack');

var nodeModules = {};
fs.readdirSync('node_modules')
.filter((x) => ['.bin'].indexOf(x) === -1)
.forEach((mod) => nodeModules[mod] = 'commonjs ' + mod);

nodeModules['../../dist/version.js'] = "commonjs ./version.js";

module.exports = {
    entry: './src/index.js',
    target: 'node',
    devtool: 'source-map',
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'index.js'
    },
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel'
        }, {
            test: /\.json$/,
            exclude: /node_modules/,
            loader: 'json'
        }]
    },
    externals: nodeModules,
    plugins: [
        new webpack.BannerPlugin(
            'require("source-map-support").install();',
            { raw: true, entryOnly: false }
        )
    ],
};
