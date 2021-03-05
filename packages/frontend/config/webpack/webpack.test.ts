import { Configuration } from 'webpack';
import { merge } from 'webpack-merge';
import TerserPlugin from 'terser-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { createHtmlWebpackPluginConfig } from './common/html-webpack-plugin';
import { APP_TITLE, SRC_PATH } from './config';
import common from '../../webpack.common';

const htmlWebpackPluginConfig = createHtmlWebpackPluginConfig(APP_TITLE, SRC_PATH);

const config: Configuration = merge(common, {
    mode: 'production',
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                parallel: true,
                extractComments: true,
            }),
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            ...htmlWebpackPluginConfig,
            hash: true,
            minify: true,
        }),
    ],
});

export default config;
