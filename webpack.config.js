var webpack = require('webpack');
var path = require('path');
var srcPath = path.join(__dirname, 'src');

var UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
var env = process.env.WEBPACK_ENV;

var plugins = [];

if (env === 'build') {
    plugins.push(new UglifyJsPlugin({ minimize: true }));
}

module.exports = {
    entry: srcPath + '/client.js',
    devtool: 'source-map',
    output: {
        path: './public/',
        filename: 'bundle.js',
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel',
                query: {
                    presets: ['es2015']
                }
            },
        ]
    },
    plugins: plugins,
    debug: (env === 'build'),
};
