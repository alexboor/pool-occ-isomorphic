'use strict';

global.Promise         = require('bluebird');


"use strict";

let path = require('path');
let webpack = require('webpack');
let ExtractTextPlugin = require("extract-text-webpack-plugin");
let CleanWebpackPlugin = require('clean-webpack-plugin');

// let BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
// let StatsPlugin = require("stats-webpack-plugin");
// let OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

//set NODE_ENV=production on the environment to add asset fingerprints
let production = process.env.NODE_ENV === "production";

let publicPath         = 'http://localhost:8050/public/assets';
let cssName            = process.env.NODE_ENV === 'production' ? 'styles-[hash].css' : 'styles.css';
let jsName             = process.env.NODE_ENV === 'production' ? 'bundle-[hash].js' : 'bundle.js';

console.log(jsName);


// let plugins = [
//     new webpack.DefinePlugin({
//         'process.env': {
//             BROWSER:  JSON.stringify(true),
//             NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development')
//         }
//     }),
//     new ExtractTextPlugin(cssName)
// ];

// if (process.env.NODE_ENV === 'production') {
//     plugins.push(
//         new CleanWebpackPlugin([ 'public/assets/' ], {
//             root: __dirname,
//             verbose: true,
//             dry: false
//         })
//     );
//     plugins.push(new webpack.optimize.DedupePlugin());
//     //plugins.push(new webpack.optimize.OccurenceOrderPlugin());
// }

// module.exports = {
//     entry: ['babel-polyfill', './src/client.js'],
//     debug: process.env.NODE_ENV !== 'production',
//     resolve: {
//         root:               path.join(__dirname, 'src'),
//         modulesDirectories: ['node_modules'],
//         extensions:         ['', '.js', '.jsx']
//     },
//     plugins,
//     output: {
//         path: `${__dirname}/public/assets/`,
//         filename: jsName,
//         publicPath
//     },
//     module: {
//         loaders: [
//             {
//                 test: /\.css$/,
//                 loader: ExtractTextPlugin.extract('style-loader', 'css-loader!postcss-loader')
//             },
//             {
//                 test: /\.less$/,
//                 loader: ExtractTextPlugin.extract('style-loader', 'css-loader!postcss-loader!less-loader')
//             },
//             { test: /\.gif$/, loader: 'url-loader?limit=10000&mimetype=image/gif' },
//             { test: /\.jpg$/, loader: 'url-loader?limit=10000&mimetype=image/jpg' },
//             { test: /\.png$/, loader: 'url-loader?limit=10000&mimetype=image/png' },
//             { test: /\.svg/, loader: 'url-loader?limit=26000&mimetype=image/svg+xml' },
//             { test: /\.(woff|woff2|ttf|eot)/, loader: 'url-loader?limit=1' },
//             { test: /\.jsx?$/, loader: 'babel', exclude: [/node_modules/, /public/] },
//             { test: /\.json$/, loader: 'json-loader' },
//         ]
//     },
//     devtool: process.env.NODE_ENV !== 'production' ? 'source-map' : null,
//     devServer: {
//         headers: { 'Access-Control-Allow-Origin': '*' }
//     }
// };

let config = {
    // devtool: 'cheap-module-source-map',

    entry: {
        'event-app': [
            'babel-polyfill',
            'react-hot-loader/patch',
            './src/client.js'
        ]

    },
    output: {
        path: `${__dirname}/public/assets/`,
        filename: jsName,
        publicPath
    },

    resolve: {
        alias: {
            // 'es6-promise': path.join(__dirname, "node_modules", 'es6-promise', 'es6-promise.js'),
            // 'fetch': path.join(__dirname, "node_modules", 'whatwg-fetch', 'fetch.js'),
        },
        // extensions: ['', '.js', '.jsx']
    },

    plugins: [

        // new webpack.ProvidePlugin({
        //     'Promise': 'es6-promise',
        //     'fetch': 'imports-loader?this=>global!exports-loader?global.fetch!whatwg-fetch'
        // }),

        // new StatsPlugin("manifest.json", {
        //     chunkModules: false,
        //     source: false,
        //     chunks: false,
        //     modules: false,
        //     assets: true
        // }),

        // new webpack.DefinePlugin({
        //     'process.env': {
        //         BROWSER: JSON.stringify(true),
        //         NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development')
        //     }
        // }),

        new ExtractTextPlugin({
            filename: cssName,
            allChunks: true
        }),


    ],

    module: {
        loaders: [
            { test: /\.gif$/, loader: 'url-loader?limit=10000&mimetype=image/gif' },
            { test: /\.jpg$/, loader: 'url-loader?limit=10000&mimetype=image/jpg' },
            { test: /\.png$/, loader: 'url-loader?limit=10000&mimetype=image/png' },
            { test: /\.svg/, loader: 'url-loader?limit=26000&mimetype=image/svg+xml' },
            { test: /\.(woff|woff2|ttf|eot)/, loader: 'url-loader?limit=1' },

            {
                test: /\.js$/,
                exclude: [/node_modules/, /public/],
                use: 'babel-loader?presets[]=es2015'
            },
            {
                test: /\.jsx?$/,
                exclude: [/node_modules/, /public/],
                use: 'babel-loader?presets[]=es2015'
            },

            { test: /\.json$/,
                loader: 'json-loader'
            },

            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader"
                })
            },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader?sourceMap!sass-loader?sourceMap"
                })
            },
            {
                test: /\.less$/,
                loader: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader?sourceMap!less-loader?sourceMap"
                })
            }
        ]
    }
};

if (production) {
    config.plugins.push(
        new webpack.NoErrorsPlugin(),
        new webpack.optimize.UglifyJsPlugin(),
        new webpack.DefinePlugin({
            "process.env": { NODE_ENV: JSON.stringify("production") }
        }),
        new webpack.optimize.OccurrenceOrderPlugin()
    )
} else {
    config.devServer = {
        port: 8050,
        headers: { "Access-Control-Allow-Origin": "*" }
    };

    if (process.env.DEV_HTTPS) {
        config.devServer.https = true
    }

    config.output.publicPath = publicPath;
    // Source maps
    config.devtool = 'cheap-module-eval-source-map';
    config.devtool = "source-map"
}

module.exports = config;