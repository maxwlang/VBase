const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');

const environment = (process.env.JSEnvironment === 'PRODUCTION' ? 'production' : 'development') || 'production';
console.log(`Webpack in ${environment} state.`);

module.exports = {
    mode: environment,
    output: {
        filename: '[name].min.js',
    },
    devtool: 'source-map',
    optimization: {
        minimizer: [new TerserPlugin()],
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery',
            swal: 'swal',
        }),
    ],
    module: {
        rules: [
            {
                test: /\.js.map$/,
                loader: 'ignore-loader',
                enforce: 'pre',
            },
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-env',
                            'minify',
                        ]
                    },
                },
            },
        ],
    }
};
