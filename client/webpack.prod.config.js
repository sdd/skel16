const webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: [
        'babel-polyfill',
        'bootstrap-loader',
        './src/index.js',
        './styles/style.css'
    ],

    output: {
        path: './dist',
        filename: 'bundle.js',
        publicPath: '/'
    },

    devtool: 'cheap-module-source-map',

    resolve: { extensions: [ '', '.js' ] },

    module: {
        loaders: [
            { test: /.js$/, exclude: /node_modules/, loader: 'babel' },

            // the following are only necessary due to usage of react-bootstrap
            { test: /\.css$/, loaders: [ 'style', 'css' ] },
            { test: /\.scss$/, loaders: [ 'style', 'css', 'sass' ] },
            { test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url?limit=10000" },
            { test: /\.(ttf|eot|svg)(\?[\s\S]+)?$/, loader: 'file' },
            { test: /bootstrap-sass\/assets\/javascripts\//, loader: 'imports?jQuery=jquery' }
        ]
    },

    plugins: [
        new webpack.NoErrorsPlugin(),
        new HtmlWebpackPlugin()
    ]
};
