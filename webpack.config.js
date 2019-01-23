const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');

const environment = (process.env.JSEnvironment === 'PRODUCTION' ? 'production' : 'development') || 'production';
console.log(`Webpack in ${environment} state.`);

module.exports = {
    mode: environment,
    output: {
        filename: '[name].min.js',
    },
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
};
