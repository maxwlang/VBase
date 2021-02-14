const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');

console.log(`Webpack in production state.`);

module.exports = {
    mode: 'production',
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
